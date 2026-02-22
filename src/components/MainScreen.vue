<template>
  <div class="w-full min-h-screen flex flex-col justify-center items-center bg-[url('@/assets/images/pokemon_bg.jpg')] bg-center bg-cover bg-no-repeat text-[var(--dark)]">
    <h1 class="text-5xl md:text-[4.5rem] font-bold text-center mb-4">POKEMON GAME 🎮</h1>
    <h3 class="text-2xl md:text-[2rem] mt-4 mb-8">Select mode to start game</h3>
    <div class="flex flex-wrap justify-center gap-4 md:gap-8 px-4">
      <button 
        @click="onStart(16)"
        class="flex flex-col justify-center items-center w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-2xl border border-[var(--dark)] cursor-pointer bg-transparent text-[var(--dark)] transition duration-250 ease-in-out hover:bg-[var(--dark)] hover:text-[var(--light)] font-inherit"
      >
        <span class="text-2xl md:text-[2rem]">4x4</span>
        <span class="text-xl md:text-[1.5rem]">Easy</span>
      </button>
      <button 
        @click="onStart(36)"
        class="flex flex-col justify-center items-center w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-2xl border border-[var(--dark)] cursor-pointer bg-transparent text-[var(--dark)] transition duration-250 ease-in-out hover:bg-[var(--dark)] hover:text-[var(--light)] font-inherit"
      >
        <span class="text-2xl md:text-[2rem]">6x6</span>
        <span class="text-xl md:text-[1.5rem]">Normal</span>
      </button>
      <button 
        @click="onStart(64)"
        class="flex flex-col justify-center items-center w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-2xl border border-[var(--dark)] cursor-pointer bg-transparent text-[var(--dark)] transition duration-250 ease-in-out hover:bg-[var(--dark)] hover:text-[var(--light)] font-inherit"
      >
        <span class="text-2xl md:text-[2rem]">8x8</span>
        <span class="text-xl md:text-[1.5rem]">Hard</span>
      </button>
      <button 
        @click="onStart(100)"
        class="flex flex-col justify-center items-center w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-2xl border border-[var(--dark)] cursor-pointer bg-transparent text-[var(--dark)] transition duration-250 ease-in-out hover:bg-[var(--dark)] hover:text-[var(--light)] font-inherit"
      >
        <span class="text-2xl md:text-[2rem]">10x10</span>
        <span class="text-xl md:text-[1.5rem]">Super Hard</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  (e: 'onStart', payload: { totalOfBlocks: number }): void
}>()

const onStart = (totalOfBlocks: number) => {
  emit('onStart', { totalOfBlocks })
}
</script>

