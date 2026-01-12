<template>
      <div class="Info_Window" v-if="visible">
        <div class="window">
          <img src="../assets/IMG/Button/Blank_Btn.png" alt="Blank Button" />
          <button class="close-btn" @click="closeWindow">
            <img src="../assets/IMG/Button/x_btn.png" alt="Close" />
          </button>
        </div>
    </div>
</template>

<script setup>


defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:visible']);
function closeWindow() {
  emit('update:visible', false);
}
</script>

<style scoped>
.Info_Window {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1002;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
}
.Info_Window .window {
  background: transparent;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}
.Info_Window img {
  width: 350px;
  max-width: 90vw;
  height: auto;
  display: block;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1003;
}

.close-btn img {
  width: 30px;
  height: 30px;
}
</style>
