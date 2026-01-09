<template>
  <div class="projects-page" id="projects">
    <div class="background"></div>
    <div class="wooden_buttons_grad buttons-container">
      <button class="wooden_imgBtn_Global project-btn"><img src="@/assets/IMG/Button/Projects_Btn.png" alt="Project 1" /></button>
      <button class="wooden_imgBtn_Global project-btn"><img src="@/assets/IMG/Button/Projects_Btn.png" alt="Project 2" /></button>
      <button class="wooden_imgBtn_Global project-btn"><img src="@/assets/IMG/Button/Projects_Btn.png" alt="Project 3" /></button>
      <button class="wooden_imgBtn_Global project-btn"><img src="@/assets/IMG/Button/Projects_Btn.png" alt="Project 4" /></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProjectsPage',
};
</script>

<style scoped>
.projects-page {
  position: relative;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('@/assets/Backgrounds/forge_gif.gif') center center/cover no-repeat;
  z-index: 1;
}
.buttons-container {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100vw;
  z-index: 2;
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
  gap: 2rem;
  padding-bottom: 2rem;
}

@media (max-width: 768px) {
  .buttons-container {
    position: relative;
    flex-direction: column;
    width: 100vw;
    left: 0;
    bottom: 0;
    padding: 8rem 0;
    align-items: center;
    justify-content: center;
  }
}
.project-btn {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  margin: 0;
  transition: transform 0.2s;
}
.project-btn img {
  width: 160px;
  height: auto;
  display: block;
}
.project-btn:hover {
  transform: scale(1.05);
}
</style>
