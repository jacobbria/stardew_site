<template>
  <!-- Chatbot container with floating button -->
  <div class="chatbot-container">
    <!-- Floating chat button -->
    <button class="chatbot-circle" @click="isChatOpen = true" title="Chat about my resume">
      💬
    </button>

    <!-- Chat Modal -->
    <div v-if="isChatOpen" class="chatbot-modal">
      <div class="modal-body">
        <!-- Header -->
        <div class="modal-header">
          <h3>Resume Chat</h3>
          <button class="close-btn" @click="isChatOpen = false">✕</button>
        </div>

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
    </div>

    <!-- Overlay backdrop -->
    <div v-if="isChatOpen" class="modal-overlay" @click="isChatOpen = false"></div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';

const isChatOpen = ref(false);
const userInput = ref('');
const messages = ref([
  {
    role: 'assistant',
    text: 'Hi! I\'m a chatbot trained on Jake\'s resume. Ask me anything about his experience, skills, or background!'
  }
]);
const isLoading = ref(false);
const messagesContainer = ref(null);

// Default resume content
const defaultResume = `JAKE BRIA
Software Developer | Full Stack Engineer

CONTACT
Email: contact@jakebria.com
Portfolio: jakebria.com

PROFESSIONAL SUMMARY
Experienced software developer with expertise in full-stack web development, cloud services, and modern JavaScript frameworks. Proven track record of building scalable applications and delivering quality solutions.

TECHNICAL SKILLS
Languages: JavaScript, Python, C#, HTML, CSS
Frameworks & Libraries: Vue.js, React, Node.js, Express, ASP.NET
Databases: SQL, MongoDB, Azure Cosmos DB
Cloud & Tools: Azure, AWS, Git, Docker, REST APIs
Other: Responsive Design, RESTful API Development, Database Design

PROFESSIONAL EXPERIENCE
Software Developer at Tech Company (2022-Present)
- Developed full-stack web applications using Vue.js and Node.js
- Implemented cloud solutions with Azure
- Collaborated with cross-functional teams to deliver quality solutions

EDUCATION
Bachelor of Science in Computer Science
University of Technology (2021)

NOTE: This is a default resume. For full details, visit the resume page.`;

// Resume content - you'll pass this from the parent or fetch it
const resumeContent = ref(defaultResume);

// Set resume content from parent
function setResume(resume) {
  if (resume && resume.trim()) {
    resumeContent.value = resume;
  }
}

// Make this accessible to parent component
defineExpose({ setResume });

async function sendMessage() {
  if (!userInput.value.trim() || isLoading.value) {
    return;
  }

  const userMsg = userInput.value;
  messages.value.push({
    role: 'user',
    text: userMsg
  });

  userInput.value = '';
  isLoading.value = true;

  try {
    const response = await fetch('/api/ChatBot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        message: userMsg,
        resume: resumeContent.value
      })
    });

    console.log('ChatBot API Response Status:', response.status);
    const responseText = await response.text();
    console.log('ChatBot API Response Text:', responseText);

    if (!response.ok) {
      try {
        const error = JSON.parse(responseText);
        throw new Error(error.error || `HTTP error! status: ${response.status}`);
      } catch (e) {
        throw new Error(`HTTP error! status: ${response.status} - ${responseText}`);
      }
    }

    const data = JSON.parse(responseText);
    messages.value.push({
      role: 'assistant',
      text: data.response
    });
  } catch (error) {
    console.error('ChatBot Error:', error);
    messages.value.push({
      role: 'assistant',
      text: `Sorry, I encountered an error: ${error.message}`
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
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
  transition: all 0.3s ease;
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
  height: 500px;
  z-index: 1001;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
}

.modal-header {
  padding: 1rem;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.modal-header h3 {
  margin: 0;
  font-size: 1rem;
  color: #333;
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #999;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.close-btn:hover {
  color: #333;
}

.messages-area {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.messages-area::-webkit-scrollbar {
  width: 6px;
}

.messages-area::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.messages-area::-webkit-scrollbar-thumb {
  background: #ccc;
  border-radius: 3px;
}

.messages-area::-webkit-scrollbar-thumb:hover {
  background: #999;
}

.message {
  display: flex;
  margin-bottom: 0.5rem;
}

.message.user {
  justify-content: flex-end;
}

.message.assistant {
  justify-content: flex-start;
}

.message-text {
  padding: 0.6rem 1rem;
  border-radius: 8px;
  max-width: 80%;
  word-wrap: break-word;
  line-height: 1.4;
}

.message.user .message-text {
  background: #667eea;
  color: white;
}

.message.assistant .message-text {
  background: #f0f0f0;
  color: #333;
}

.message-loading {
  display: flex;
  justify-content: flex-start;
}

.message-loading span {
  background: #f0f0f0;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  color: #666;
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
  padding: 1rem;
  border-top: 1px solid #e0e0e0;
  display: flex;
  gap: 0.5rem;
}

.chat-input {
  flex: 1;
  padding: 0.6rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 0.9rem;
  outline: none;
  transition: border-color 0.2s;
}

.chat-input:focus {
  border-color: #667eea;
}

.chat-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.send-btn {
  padding: 0.6rem 1.2rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
}

.send-btn:hover:not(:disabled) {
  background: #764ba2;
}

.send-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

@media (max-width: 640px) {
  .chatbot-modal {
    width: calc(100vw - 2rem);
    height: calc(100vh - 200px);
    bottom: 70px;
    right: 1rem;
  }

  .message-text {
    max-width: 90%;
  }
}
</style>
