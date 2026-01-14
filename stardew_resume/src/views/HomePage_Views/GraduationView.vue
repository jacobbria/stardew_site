<template>
  <div class="graduation-bg">
    <InfoWindow
      v-model:visible="showInfoWindow"
      :content="selectedDegree"
    />

    <div class="wooden_buttons_grad">
      <button class="wooden-btn-shared education-btn-blank" @click="showEducation('AAS Software Dev.\nSinclair College\n2024')">
        <img src="@/assets/IMG/Button/Blank_Btn.png" alt="" class="btn-bg" />
        <span class="btn-text">Assoc.<br>Degree</span>
      </button>
      <button class="wooden-btn-shared education-btn-blank" @click="showEducation('BS Info Tech.\nFranklin U.\n2025')">
        <img src="@/assets/IMG/Button/Blank_Btn.png" alt="" class="btn-bg" />
        <span class="btn-text">Bach.<br>Degree</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InfoWindow from '@/components/InfoWindow.vue';

const showInfoWindow = ref(false);
const selectedDegree = ref('');

function showEducation(degree) {
  selectedDegree.value = degree;
  showInfoWindow.value = true;
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

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

.education-btn-blank {
  display: inline-block;
}
</style>
