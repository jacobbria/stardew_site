<template>
  <div class="work-page" id="work">

    <div class="background"></div>
    <InfoWindow
     v-model:visible="showInfoWindow"
     :content="selectedWork"
     />


    <div class="wooden_buttons_grad buttons-container">
      <button
        v-for="work in workExperiences"
        :key="work.id"
        class="wooden_imgBtn_Global wooden-btn-shared"
        @click="showWork(work)">
        <img src="@/assets/IMG/Button/Blank_Btn.png" :alt="work.name" class="btn-bg" />
        <span class="btn-text">{{ work.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InfoWindow from '@/components/InfoWindow.vue';

const showInfoWindow = ref(false);
const selectedWork = ref(null);

const workExperiences = [
  { id: 1, name: 'Work 1', description: 'Description for work experience 1' },
  { id: 2, name: 'Work 2', description: 'Description for work experience 2' },
  { id: 3, name: 'Work 3', description: 'Description for work experience 3' }
];

function showWork(work) {
  selectedWork.value = work.description;
  showInfoWindow.value = true;
}

</script>

  <style scoped>
.work-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/Backgrounds/office_gif.gif') center center/cover no-repeat;
  z-index: 1;
}




</style>
