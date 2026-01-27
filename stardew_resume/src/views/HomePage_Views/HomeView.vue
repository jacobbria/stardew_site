<script setup>
import { ref, } from 'vue'
import LandingView from '../../assets/Backgrounds/landing_pixel.gif'
import ContentModal from '@/components/ContentModal.vue'


const navButtons = [
  { title: 'Projects', section: 'projects-section' },
  { title: 'Work', section: 'work-section' },
  { title: 'School', section: 'graduation-section' },
  { title: 'Links', action: 'links' }
]

const links = [
  { label: 'GitHub', href: 'https://github.com/jacobbria' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/jacobbria/' }
]

const linksWindowOpen = ref(false)


function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

function handleNavClick(button) {
  if (button.action === 'links') {
    linksWindowOpen.value = true
    return
  }

  if (button.section) {
    scrollToSection(button.section)
  }
}


</script>

<template>
  <main class="landing" :style="{ backgroundImage: `url(${LandingView})` }">
    <nav class="ButtonSectionStyle_Standard" aria-label="Landing buttons">
      <button
        v-for="button in navButtons"
        :key="button.title"
        class="ButtonStyle_Standard"
        @click="handleNavClick(button)"
      >
        <img src="@/assets/IMG/Button/Blank_Btn.png" alt="Button"/>
        <span class="ButtonTextStyle_Standard">{{ button.title }}</span>
      </button>
    </nav>
    <ContentModal v-model:visible="linksWindowOpen">
      <div class="link-list">
        <div v-for="link in links" :key="link.href">
          <a
            :href="link.href"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ link.label }}
          </a>
        </div>
      </div>
    </ContentModal>
  </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

.landing {
  position: relative;
  width: 100%;
  height: auto;
  min-height: 100vh;
  overflow: hidden;
  margin: 0;
  padding: 0;
  z-index: 0;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
}

.landing-title {
  position: absolute;
  top: 18vh;
  left: 50%;
  transform: translateX(-50%);
  width: 100vw;
  text-align: center;
  font-size: clamp(2.5rem, 7vw, 6rem);
  color: #eeeeee;
  text-shadow: 3px 2px 4px #181818, 0 1px 0 #1a1a1a;
  letter-spacing: 0.08em;
  z-index: 3;
  font-weight: 700;
  pointer-events: none;
}
.type-cursor {
  display: inline-block;
  width: 1ch;
  animation: blink 1s steps(1) infinite;
  color: #f4ffff;
}

.link-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}


</style>
