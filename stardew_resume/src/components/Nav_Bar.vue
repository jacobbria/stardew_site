<template>
  <nav class="translucent-nav_bar">
    <div class="nav-left">
      <a href="#home-section" class="nav-button">
        <img src="@/assets/IMG/Button/Blank_Btn.png" class="nav-icon" alt="Home" />
        <span class="nav-text">Home</span>
      </a>
      <a href="/api/resume" class="nav-button" aria-label="Download Resume">
        <img src="@/assets/IMG/Button/Blank_Btn.png" class="nav-icon" alt="Resume" />
        <span class="nav-text nav-text--small">Resume</span>
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
  gap: 1.5rem;
}

.nav-button {
  position: relative;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, filter 0.2s;
}

.nav-button:hover {
  transform: scale(1.05);
  filter: brightness(1.2);
}

.nav-icon {
  cursor: pointer;
  width: 70px;
  height: auto;
  object-fit: contain;
}

.nav-text {
  position: absolute;
  color: var(--text-primary);
  font-family: 'Press Start 2P', cursive;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  pointer-events: none;
}

.nav-text--small {
  font-size: 0.55rem;
}

@media (max-width: 768px) {
  .translucent-nav_bar {
    padding: 0 1rem;
    height: 60px;
  }
}
</style>
