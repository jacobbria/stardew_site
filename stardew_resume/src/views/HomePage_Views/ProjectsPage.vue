<template>
  <div class="projects-page" id="projects">

    <div class="background"></div>
    <InfoWindow
     v-model:visible="showInfoWindow"
     :content="selectedProject"
     />


    <div class="wooden_buttons_grad buttons-container">
      <button
        v-for="project in projects"
        :key="project.id"
        class="wooden_imgBtn_Global wooden-btn-shared"
        @click="showProject(project)">
        <img src="@/assets/IMG/Button/Blank_Btn.png" :alt="project.name" class="btn-bg" />
        <span class="btn-text">{{ project.name }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InfoWindow from '@/components/InfoWindow.vue';

const showInfoWindow = ref(false);
const selectedProject = ref(null);

const projects = [
  { id: 1, name: 'project 1', text: 'Description for project 1' },
  { id: 2, name: 'project 2', text: 'Description for project 2' },
  { id: 3, name: 'project 3', text: 'Description for project 3' },
  { id: 4, name: 'project 4', text: 'Description for project 4' }
];

function showProject(project) {
  selectedProject.value = project.text;
  showInfoWindow.value = true;
}

</script>

  <style scoped>
.projects-page {
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
  background: url('@/assets/Backgrounds/forge_gif.gif') center center/cover no-repeat;
  z-index: 1;
}


</style>
