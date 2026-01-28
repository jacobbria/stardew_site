<template>
  <div class="homepage">
    <Nav_Bar />
    <section id="home-section">
      <HomeView />
    </section>
    <section id="graduation-section">
      <GraduationView />
    </section>
    <section id="projects-section">
      <ProjectsPage />
    </section>
    <section id="work-section">
      <WorkView />
    </section>
    <!-- Chatbot component fixed on screen -->
    <ChatBot />
  </div>
</template>

<script setup>
import Nav_Bar from '@/components/Nav_Bar.vue';
import HomeView from './HomePage_Views/HomeView.vue';
import GraduationView from './HomePage_Views/GraduationView.vue';
import ProjectsPage from './HomePage_Views/ProjectsPage.vue';
import WorkView from './HomePage_Views/WorkView.vue';
import ChatBot from '@/components/ChatBot.vue';
</script>

<style scoped>
.homepage {
  display: flex;
  flex-direction: column;
  width: 100vw;
  min-height: 100vh;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
}
section {
  width: 100vw;
  min-height: 100vh;
  scroll-snap-align: start;
}
</style>
