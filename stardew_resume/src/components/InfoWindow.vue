<template>
      <div class="Info_Window" v-if="visible">
        <div class="window">
          <img src="../assets/IMG/Button/Blank_Btn.png" alt="Blank Button" />
            <div class="content-text" v-if="content && !$slots.default">{{ content }}</div>
            <div class="content-slot" v-else-if="$slots.default">
              <slot />
            </div>
          <button class="close-btn" @click="closeWindow">
            <img src="../assets/IMG/Button/X_btn.png" alt="Close" />
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
  content: {
    type: String,
    default: '',
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
  width: 400px;
  max-width: 90vw;
  height: auto;
  display: block;
}

.content-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  color: #000;
  text-align: center;
  padding: .4rem;
  max-width: 95%;
  line-height: 1.8;
  pointer-events: none;
  white-space: pre-line;
}

.content-slot {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  color: #000;
  text-align: center;
  padding: .4rem;
  max-width: 95%;
  line-height: 1.8;
  pointer-events: auto;
  white-space: pre-line;
}

:deep(.content-slot a) {
  color: #0b4aa6;
  text-decoration: underline;
}

:deep(.content-slot a:hover) {
  color: #083a82;
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



@media (max-width: 768px) {
  .content-text {
    font-size: 1rem;
    line-height: 1.6;
  }
  .content-slot {
    font-size: 1rem;
    line-height: 1.6;
  }
}

@media (max-width: 480px) {
  .content-text {
    font-size: .7rem;
    line-height: 1.4;
    padding: 0.5rem;
  }
  .content-slot {
    font-size: .7rem;
    line-height: 1.4;
    padding: 0.5rem;
  }
}
</style>
