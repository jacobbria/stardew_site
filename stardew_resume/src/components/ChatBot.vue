<template>
  <div class="chatbot-container">
    <button class="chatbot-circle" @click="testApi" title="Test Chatbot API">
      🧪
    </button>

    <div v-if="testResult" class="test-result">
      <h3>API Test Result</h3>
      <p><strong>Status:</strong> {{ testResult.success ? '✅ SUCCESS' : '❌ FAILED' }}</p>
      <p><strong>Message:</strong> {{ testResult.message }}</p>
      <p v-if="testResult.hasApiKey"><strong>API Key Present:</strong> Yes ({{ testResult.keyLength }} chars)</p>
      <p v-else><strong>API Key Present:</strong> No</p>
      <button @click="testResult = null">Clear</button>
    </div>
  </div>
</template>


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

.test-result {
  position: fixed;
  bottom: 100px;
  right: 2rem;
  width: 350px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.test-result h3 {
  margin-top: 0;
  color: #333;
}

.test-result p {
  margin: 0.8rem 0;
  font-size: 0.95rem;
  color: #666;
}

.test-result button {
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.test-result button:hover {
  background: #764ba2;
}

</style>

<script setup>
import { ref } from 'vue';

const testResult = ref(null);

async function testApi() {
  console.log('Testing API...');
  try {
    const response = await fetch('/api/ChatBot', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        test: true
      })
    });

    console.log('Response status:', response.status);
    const data = await response.json();
    console.log('Response data:', data);

    testResult.value = data;
  } catch (error) {
    console.error('Test error:', error);
    testResult.value = {
      success: false,
      message: 'Network error: ' + error.message
    };
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

.test-result {
  position: fixed;
  bottom: 100px;
  right: 2rem;
  width: 350px;
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  z-index: 1000;
}

.test-result h3 {
  margin-top: 0;
  color: #333;
}

.test-result p {
  margin: 0.8rem 0;
  font-size: 0.95rem;
  color: #666;
}

.test-result button {
  margin-top: 1rem;
  padding: 0.6rem 1rem;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.test-result button:hover {
  background: #764ba2;
}
</style>
