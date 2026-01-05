<template>
  <div class="graduation-bg">
    <div class="wooden_buttons_grad">
      <img class="wooden_imgBtn_Global" :src="AAsBtn" alt="AAS Degree" />
      <img class="wooden_imgBtn_Global" :src="BSBtn" alt="BS Degree" />
    </div>
  </div>
</template>

<script setup>
import AAsBtn from '../../assets/IMG/Button/AAS_Btn.png'
import BSBtn from '../../assets/IMG/Button/BS_Btn.png'
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
.wooden_buttons_grad {
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  transform: translateY(50%);
}

</style>
