<template>
  <div class="homepage">
    <section id="home-section">
      <HomeView />
    </section>
    <section id="graduation-section">
      <GraduationView />
    </section>
    <!-- Add more sections/components here as needed -->
  </div>
</template>

<script setup>
import HomeView from './HomePage_Views/HomeView.vue';
import GraduationView from './HomePage_Views/GraduationView.vue';
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
