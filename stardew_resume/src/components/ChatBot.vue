<template>
  <!-- Fixed chatbot circle in bottom right -->
  <div class="chatbot-container">
    <button class="chatbot-circle" @click="openChat" title="Chat about my resume">
      CB
    </button>

    <!-- Chat Modal -->
    <div class="chatbot-modal" v-if="isChatOpen">
      <div class="modal-body">
        <img src="../assets/IMG/Button/Blank_Btn.png" alt="Chat Background" class="modal-bg" />

        <div class="chat-content">
          <!-- Messages area -->
          <div class="messages-area" ref="messagesContainer">
            <div v-for="(msg, index) in messages" :key="index" :class="['message', msg.role]">
              <span class="message-text">{{ msg.text }}</span>
            </div>
            <div v-if="isLoading" class="message-loading">
              <span>Thinking...</span>
            </div>
          </div>

          <!-- Input area -->
          <div class="input-area">
            <input
              v-model="userInput"
              type="text"
              placeholder="Ask about my resume..."
              @keyup.enter="sendMessage"
              :disabled="isLoading"
              class="chat-input"
            />
            <button @click="sendMessage" :disabled="isLoading || !userInput.trim()" class="send-btn">
              Send
            </button>
          </div>
        </div>

        <!-- Close button -->
        <button class="close-btn" @click="closeChat">
          <img src="../assets/IMG/Button/X_btn.png" alt="Close" />
        </button>
      </div>
    </div>

    <!-- Overlay backdrop -->
    <div v-if="isChatOpen" class="modal-overlay" @click="closeChat"></div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue';

const isChatOpen = ref(false);
const userInput = ref('');
const messages = ref([
  {
    role: 'assistant',
    text: 'Hi! I\'m a chatbot trained on Jake\'s resume. Ask me anything about his experience, skills, or background!'
  }
]);
const conversationHistory = ref([]);
const isLoading = ref(false);
const messagesContainer = ref(null);
const resumeContent = ref('');

// Fetch resume content on mount
onMounted(async () => {
  try {
    const response = await fetch('/api/GetResume', {
      method: 'GET'
    });

    if (response.ok) {
      const blob = await response.blob();
      // For now, we'll use a placeholder. In production, you might extract text from PDF
      resumeContent.value = await extractTextFromPDF(blob);
    }
  } catch (error) {
    console.error('Failed to fetch resume:', error);
    // Fallback resume content if fetch fails
    resumeContent.value = 'Resume content unavailable';
  }
});

// Simple PDF text extraction (basic approach)
async function extractTextFromPDF(blob) {
  try {
    // For a production app, you'd want to use a proper PDF parser
    // For now, return a placeholder that indicates PDF was retrieved
    return `[Resume PDF loaded - ${blob.size} bytes]`;
  } catch (error) {
    console.error('Error extracting PDF text:', error);
    return 'Resume content';
  }
}

function openChat() {
  isChatOpen.value = true;
  nextTick(() => {
    scrollToBottom();
  });
}

function closeChat() {
  isChatOpen.value = false;
}

async function sendMessage() {
  if (!userInput.value.trim() || isLoading.value) return;

  // Add user message to display
  const userMsg = userInput.value;
  messages.value.push({
    role: 'user',
    text: userMsg
  });

  userInput.value = '';
  isLoading.value = true;

  try {
    // Call the ChatBot Azure Function
    const response = await fetch('/api/ChatBot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMsg,
        resume: resumeContent.value,
        conversationHistory: conversationHistory.value
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Add assistant response
    messages.value.push({
      role: 'assistant',
      text: data.response
    });

    // Update conversation history for next request
    if (data.conversationHistory) {
      conversationHistory.value = data.conversationHistory;
    }
  } catch (error) {
    console.error('Error sending message:', error);
    messages.value.push({
      role: 'assistant',
      text: 'Sorry, I encountered an error. Please try again.'
    });
  } finally {
    isLoading.value = false;
    nextTick(() => {
      scrollToBottom();
    });
  }
}

function scrollToBottom() {
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight;
  }
}
</script>

<style scoped>
.chatbot-container {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
}

.chatbot-circle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  font-weight: bold;
  font-size: 0.9rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
  font-family: 'Press Start 2P', cursive;
}

.chatbot-circle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
}

.chatbot-circle:active {
  transform: scale(0.95);
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.chatbot-modal {
  position: fixed;
  bottom: 100px;
  right: 2rem;
  width: 400px;
  max-width: 90vw;
  max-height: 500px;
  z-index: 1001;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-body {
  background: transparent;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 100%;
}

.modal-bg {
  width: 100%;
  height: 100%;
  display: block;
  border-radius: 16px;
}

.chat-content {
  position: absolute;
  width: 95%;
  height: 90%;
  display: flex;
  flex-direction: column;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.messages-area {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-bottom: 1rem;
  padding-right: 0.5rem;
}

.messages-area::-webkit-scrollbar {
  width: 6px;
}

.messages-area::-webkit-scrollbar-track {
  background: transparent;
}

.messages-area::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 3px;
}

.message {
  display: flex;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.65rem;
  line-height: 1.4;
  word-wrap: break-word;
  max-width: 100%;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.message-text {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  max-width: 85%;
  color: var(--text-primary);
}

.message.user .message-text {
  background: rgba(102, 126, 234, 0.2);
  color: var(--text-primary);
}

.message-loading {
  display: flex;
  justify-content: flex-start;
}

.message-loading span {
  background: rgba(0, 0, 0, 0.1);
  padding: 0.5rem 0.8rem;
  border-radius: 8px;
  color: var(--text-primary);
  font-family: 'Press Start 2P', cursive;
  font-size: 0.65rem;
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
}

.input-area {
  display: flex;
  gap: 0.5rem;
  width: 100%;
}

.chat-input {
  flex: 1;
  padding: 0.6rem;
  border: 2px solid rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.65rem;
  color: var(--text-primary);
  background: rgba(255, 255, 255, 0.9);
  outline: none;
  transition: border-color 0.3s ease;
}

.chat-input:focus {
  border-color: #667eea;
}

.chat-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-btn {
  padding: 0.6rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.65rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;
}

.send-btn:hover:not(:disabled) {
  background: #764ba2;
  transform: translateY(-2px);
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.close-btn {
  position: absolute;
  top: 15px;
  right: 15px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.close-btn img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

@media (max-width: 640px) {
  .chatbot-modal {
    width: calc(100vw - 2rem);
    bottom: 80px;
    right: 1rem;
  }

  .chatbot-circle {
    bottom: 1rem;
    right: 1rem;
  }

  .message {
    font-size: 0.6rem;
  }

  .message-text {
    max-width: 90%;
  }

  .chat-input {
    font-size: 0.6rem;
  }

  .send-btn {
    font-size: 0.6rem;
    padding: 0.5rem 0.8rem;
  }
}
</style>
