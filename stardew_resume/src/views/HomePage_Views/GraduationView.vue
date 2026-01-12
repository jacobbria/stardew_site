<template>
  <div class="graduation-bg">
    <InfoWindow
      v-model:visible="showInfoWindow"
    />

    <div class="wooden_buttons_grad">
      <button class="wooden_imgBtn_Global education-btn" @click="showEducation('AAS')">
        <img :src="AAsBtn" alt="AAS Degree" />
      </button>
      <button class="wooden_imgBtn_Global education-btn" @click="showEducation('BS')">
        <img :src="BSBtn" alt="BS Degree" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InfoWindow from '@/components/InfoWindow.vue';
import AAsBtn from '../../assets/IMG/Button/AAS_Btn.png'
import BSBtn from '../../assets/IMG/Button/BS_Btn.png'

const showInfoWindow = ref(false);

function showEducation(degree) {
  showInfoWindow.value = true;
  // You can use the degree parameter to show different content
  console.log('Showing info for:', degree);
}
</script>

<style scoped>
.graduation-bg {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: url('@/assets/Backgrounds/graduation_gif.gif') center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.wooden_buttons_grad {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translateY(50%);
}

.education-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: transform 0.2s;
}

.education-btn img {
  width: auto;
  height: auto;
  display: block;
}

.education-btn:hover {
  transform: scale(1.05);
}

</style>
