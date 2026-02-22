<template>
  <div class="w-full min-h-screen flex flex-col justify-center items-center bg-[url('@/assets/images/pokemon_bg.jpg')] bg-center bg-cover bg-no-repeat text-[var(--dark)]">
    <h1 class="text-5xl md:text-[5rem] mb-6 font-bold text-center">✨ Congratulations ✨</h1>
    <h3 class="text-3xl md:text-[3rem] mt-6">{{ Math.round(timer / 1000) }} seconds</h3>
    <p class="text-2xl mt-2">Total Moves: {{ moves }}</p>
    <button 
      @click="onStartAgain()"
      class="font-inherit bg-transparent shadow-none border border-[var(--dark)] text-[var(--dark)] mt-8 py-4 px-8 rounded-xl text-2xl font-bold cursor-pointer transition duration-200 hover:bg-[var(--dark)] hover:text-[var(--light)]"
    >
      Start Again
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import confetti from 'canvas-confetti'

const props = defineProps<{
  timer: number
  moves: number
}>()

const emit = defineEmits<{
  (e: 'onStartAgain'): void
}>()

const onStartAgain = () => {
  emit('onStartAgain')
}

onMounted(() => {
  var duration = 3 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  var interval: any = setInterval(function() {
    var timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    var particleCount = 50 * (timeLeft / duration);
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
    confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
  }, 250);
})
</script>
