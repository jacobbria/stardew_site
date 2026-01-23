<script setup>
import { ref, onMounted } from 'vue'
import LandingView from '../../assets/Backgrounds/landing_pixel.gif'

const fullTitle = 'Jake Bria'
const displayedTitle = ref('')
const navButtons = [
  { title: 'Projects', section: 'projects-section' },
  { title: 'Work', section: 'work-section' },
  { title: 'School', section: 'graduation-section' },
  { title: 'Links', section: 'links-section' }
]


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

function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}


</script>

<template>
  <main class="landing" :style="{ backgroundImage: `url(${LandingView})` }">
    <div class="landing-title pixel-font">
      <span>{{ displayedTitle }}</span><span class="type-cursor">|</span>
    </div>
    <nav class="wooden__buttons" aria-label="Landing buttons">
      <button
        v-for="button in navButtons"
        :key="button.section"
        class="education-btn-blank"
        @click="scrollToSection(button.section)"
      >
        <img src="@/assets/IMG/Button/Blank_Btn.png" alt="" class="btn-bg" />
        <span class="btn-text">{{ button.title }}</span>
      </button>
    </nav>
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
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

.education-btn-blank {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: transform 0.2s;
  position: relative;
  display: inline-block;
}

.education-btn-blank:hover {
  transform: scale(1.05);
}

.btn-bg {
  display: block;
  width: auto;
  height: auto;
}

.btn-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Press Start 2P', cursive;
  font-size: 1.2rem;
  color: #000;
  text-transform: uppercase;
  letter-spacing: 1px;
  white-space: normal;
  text-align: center;
  line-height: 1.6;
  pointer-events: none;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .btn-text {
    font-size: 0.8rem;
  }
}

</style>
