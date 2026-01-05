<template>
  <div class="custom-navbar">
    <v-img src="/src/assets/IMG/Button/JB_Btn.png" class="jb-btn" max-width="80" max-height="80" />
    <div class="nav-icons">
      <a v-for="item in navItems" :key="item.label" :href="item.to" :target="item.img ? '_blank' : '_self'" class="nav-link">
        <template v-if="item.img">
          <v-img :src="item.img" max-width="40" max-height="40" class="nav-icon" />
        </template>
        <template v-else>
          <span class="nav-text">{{ item.label }}</span>
        </template>
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
  { label: 'Graduation', to: '/graduation', img: null },
]
</script>

<style scoped>
.nav-link {
  margin: 0 0.5rem;
  text-decoration: none;
}
.nav-text {
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  padding: 0.5rem 1rem;
  background: rgba(255,255,255,0.8);
  border-radius: 0.5rem;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
  transition: background 0.2s;
}
.nav-text:hover {
  background: rgba(255,255,255,1);
}
</style>
