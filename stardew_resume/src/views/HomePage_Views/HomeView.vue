<script setup>
import { ref, onMounted } from 'vue'
import LandingView from '../assets/Backgrounds/landing_pixel.gif'
import AboutBtn from '../assets/IMG/Button/About_Btn.png'
import ProjectsBtn from '../assets/IMG/Button/Projects_Btn.png'
import SchoolBtn from '../assets/IMG/Button/School_Btn.png'
import WorkBtn from '../assets/IMG/Button/Work_Btn.png'

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
    <nav class="landing__buttons" aria-label="Landing buttons">
      <a class="landing__button" href="#about">
        <img :src="AboutBtn" alt="About" />
      </a>
      <a class="landing__button" href="#projects">
        <img :src="ProjectsBtn" alt="Projects" />
      </a>
      <a class="landing__button" href="#school">
        <img :src="SchoolBtn" alt="School" />
      </a>
      <a class="landing__button" href="#work">
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

.landing__buttons {
  position: absolute;
  left: 50%;
  bottom: clamp(25px, 4vh, 36px);
  transform: translateX(-50%);
  width: min(1100px, 92vw);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0 1rem;
  z-index: 2;
  pointer-events: auto;
  transition: filter 0.3s ease;
}

.landing__button img {
  display: block;
  width: clamp(80px, 8vw, 200px);
  height: auto;
}


.landing__button {
  display: flex;
  flex-direction: column;
  border-radius: 8px;
  transition: filter 180ms ease, transform 180ms ease;
  will-change: filter, transform;
  filter: drop-shadow(0 8px 16px rgba(0,0,0,0.28));
}

.landing__button:hover,
.landing__button:focus {
  filter: drop-shadow(0 14px 28px rgba(0,0,0,0.38));
  transform: translateY(-3px);
  filter: brightness(1.2)
}


@media (max-width: 900px) {
  .landing__buttons {
    justify-content: center;
    gap: clamp(10px, 4vw, 20px);
    flex-wrap: wrap;
    padding: 0 0.5rem;
  }

}

@media (max-width: 420px) {
  .landing__buttons {
    flex-direction: column;
  }

}

@media (max-width: 320px) {
  .landing__buttons {
    bottom: 70px;
  }
}

</style>
