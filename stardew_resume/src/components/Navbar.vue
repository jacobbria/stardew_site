<template>
  <nav class="translucent-navbar">
    <div class="nav-left">
      <a href="#home-section" class="home-link">
        <img src="@/assets/IMG/Button/JB_Btn.png" class="home-icon" alt="Home" />
      </a>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
.translucent-navbar {
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
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: transform 0.2s;
}

.home-link:hover {
  transform: scale(1.1);
}

.home-icon {
  cursor: pointer;
  width: 50px;
  height: 50px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .translucent-navbar {
    padding: 0 1rem;
    height: 60px;
  }
}
</style>
