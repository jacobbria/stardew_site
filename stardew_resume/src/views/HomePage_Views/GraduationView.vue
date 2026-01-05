<template>
  <div class="graduation-bg">
    <div class="graduation-content">
      <button class="degree-btn">Degree 1</button>
      <button class="degree-btn">Degree 2</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GraduationView',
};
</script>

<style scoped>
.graduation-bg {
  width: 100vw;
  height: 100vh;
  background: url('@/assets/Backgrounds/graduation_gif.gif') center center/cover no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
}
.graduation-content {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
}
.degree-btn {
  font-size: 2rem;
  padding: 1.5rem 3rem;
  background: rgba(255,255,255,0.85);
  border: none;
  border-radius: 1rem;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
  cursor: pointer;
  font-weight: bold;
  transition: background 0.2s;
}
.degree-btn:hover {
  background: rgba(255,255,255,1);
}
</style>
