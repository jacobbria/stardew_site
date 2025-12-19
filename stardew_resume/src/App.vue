<template>
  <v-app>
    <!-- Only show Navbar if not on the landing page (/) -->
    <Navbar v-if="route.path !== '/'" />
    <v-main>
      <HomeView />
    </v-main>
  </v-app>
</template>

<script setup>
import { useRoute } from 'vue-router';
import HomeView from './views/HomeView.vue';
import Navbar from './components/Navbar.vue';

const route = useRoute();
</script>

<style scoped>


</style>
