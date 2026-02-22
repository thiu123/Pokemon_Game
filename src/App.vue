<template>
  <main-screen
    v-if="statusMatch === 'default'"
    @onStart="setStatusMatch($event)"
  />
  <interact-screen
    v-if="statusMatch === 'match'"
    :cardsContext="settings.cardsContext"
    @onFinish="onGetResult"
  />
  <result-screen
    v-if="statusMatch === 'result'"
    :timer="timer"
    :moves="moves"
    @onStartAgain="statusMatch = 'default'"
  />
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import MainScreen from './components/MainScreen.vue'
import InteractScreen from './components/InteractScreen.vue'
import ResultScreen from './components/ResultScreen.vue'
import { shuffled } from './utils/array';

const statusMatch = ref<'default' | 'match' | 'result'>('default');
const timer = ref(0)
const moves = ref(0)

const settings = reactive({
  totalOfBlocks: 0,
  cardsContext: [] as number[],
  startedAt: 0,
})

const setStatusMatch = (config: { totalOfBlocks: number }) => {
  settings.totalOfBlocks = config.totalOfBlocks
  
  const firstCards = Array.from(
    { length: settings.totalOfBlocks / 2 },
    (_, i) => i + 1
  )
  const secondCards = [...firstCards]
  const cards = [...firstCards, ...secondCards]
  
  settings.cardsContext = shuffled(cards)
  settings.startedAt = new Date().getTime()
  
  statusMatch.value = 'match'
}

const onGetResult = (payload: { moves: number }) => {
  timer.value = new Date().getTime() - settings.startedAt
  moves.value = payload.moves
  statusMatch.value = 'result'
}
</script>

<style></style>
