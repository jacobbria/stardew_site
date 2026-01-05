<script setup>
import { ref, onMounted } from 'vue'
import LandingView from '../../assets/Backgrounds/landing_pixel.gif'
import AboutBtn from '../../assets/IMG/Button/About_Btn.png'
import ProjectsBtn from '../../assets/IMG/Button/Projects_Btn.png'
import SchoolBtn from '../../assets/IMG/Button/School_Btn.png'
import WorkBtn from '../../assets/IMG/Button/Work_Btn.png'

const fullTitle = 'Jake Bria'
const displayedTitle = ref('')

onMounted(() => {
  let i = 0
  function type() {
    if (i <= fullTitle.length) {
      displayedTitle.value = fullTitle.slice(0, i)
      i++
      setTimeout(type, 120)
    }
  }
  type()
})
</script>

<template>
  <main class="landing" :style="{ backgroundImage: `url(${LandingView})` }">
    <div class="landing-title pixel-font">
      <span>{{ displayedTitle }}</span><span class="type-cursor">|</span>
    </div>
    <nav class="wooden__buttons" aria-label="Landing buttons">
      <a class="wooden_imgBtn_Global" href="#about">
        <img :src="AboutBtn" alt="About" />
      </a>
      <a class="wooden_imgBtn_Global" href="#projects">
        <img :src="ProjectsBtn" alt="Projects" />
      </a>
      <a class="wooden_imgBtn_Global" href="#graduation-section">
        <img :src="SchoolBtn" alt="School" />
      </a>
      <a class="wooden_imgBtn_Global" href="#work">
        <img :src="WorkBtn" alt="Work" />
      </a>
    </nav>
  </main>
</template>

<style scoped>

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
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}



</style>
