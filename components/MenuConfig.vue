<template>
    <div class="container mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-0">
        <div class="box general">
          <button @click="changeComponent('GeneralConfig')" class="menu-button">
            General
          </button>
        </div>
        <div class="box sound-animation">
          <button @click="changeComponent('SoundConfig')" class="menu-button">
            Sound
          </button>
          <button @click="changeComponent('AnimationsConfig')" class="menu-button">
            Animations
          </button>
          <button @click="goBack()" class="menu-button">
            Autodarts settings
          </button>
        </div>     
      </div>
    </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue';

const emit = defineEmits(['changeComponent']);

const changeComponent = (componentName: string) => {
  emit('changeComponent', componentName);
};

function goBack() {
  window.history.back();
}

</script>

<style scoped>
.container {
  max-width: 1000px;
}
.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(2, 1fr);
  gap: 0;
}
.general {
  grid-row: span 3;
  padding: 5px !important;
  height: 400px;
}
.sound-animation {
  display: flex;
  flex-direction: column;
  grid-row: span 3;
}
.menu-button {
  margin: 5px !important;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background: rgba(255, 255, 255, 0.1) !important;
  color: white;
  font-weight: bold;
  font-size: 24pt !important;
  border-radius: 5px !important;
  border: none;
  cursor: pointer;
  transition: background 0.3s, color 0.3s;
}
.menu-button:hover {
  background: rgba(255, 255, 255, 0.2) !important;
}
.box {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>