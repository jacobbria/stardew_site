<template>
  <div class="custom-navbar">
    <v-img src="/src/assets/IMG/Button/JB_Btn.png" class="jb-btn" max-width="80" max-height="80" />
    <div class="nav-icons">
      <a v-for="item in navItems" :key="item.label" :href="item.to" target="_blank">
        <v-img :src="item.img" max-width="40" max-height="40" class="nav-icon" />
      </a>
    </div>
  </div>
</template>

<script setup>
import LinkedIn from '../assets/IMG/Logos/LinkedIn_Icon.png'
import GitHub from '../assets/IMG/Logos/GitHub_Icon.png'

const navItems = [
  { label: 'LinkedIn', to: 'https://www.linkedin.com/in/jakebria/', img: LinkedIn },
  { label: 'GitHub', to: 'https://github.com/jakebria', img: GitHub },
]
</script>

<style scoped>



</style>
