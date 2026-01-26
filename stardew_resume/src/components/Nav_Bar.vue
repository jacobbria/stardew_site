<template>
  <nav class="translucent-nav_bar">
    <div class="nav-left">
      <a href="#home-section" class="home-link">
        <img src="@/assets/IMG/Button/Blank_Btn.png" class="home-icon" alt="Home" />
        <span class="home-text">Home</span>
      </a>
      <a href="/api/resume" class="resume-link" aria-label="Download Resume">
        <img src="@/assets/IMG/Button/Blank_Btn.png" class="resume-icon" alt="Resume" />
        <span class="resume-text">Resume</span>
      </a>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.translucent-nav_bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 70px;
  background: transparent;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0 2rem;
  z-index: 1000;
}

.nav-left {
  display: flex;
  align-items: center;
}

.home-link {
  position: relative;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s;
}

.home-icon {
  cursor: pointer;
  width: 70px;
  height: auto;
  object-fit: contain;
}

.home-text {
  position: absolute;
  color: #000;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  pointer-events: none;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}

.resume-link {
  text-decoration: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 1rem;
  transition: transform 0.2s;
}

.resume-icon {
  cursor: pointer;
  width: 70px;
  height: auto;
  object-fit: contain;
}

.resume-text {
  position: absolute;
  color: #000;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.55rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  pointer-events: none;
  text-shadow: 1px 1px 2px rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  .translucent-nav_bar {
    padding: 0 1rem;
    height: 60px;
  }
}
</style>
