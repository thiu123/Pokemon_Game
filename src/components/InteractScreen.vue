<template>
  <div
    class="fixed top-0 left-0 w-full h-screen z-10 bg-[url('@/assets/images/pokemon_bg.jpg')] bg-center bg-cover bg-no-repeat text-[var(--light)] flex flex-col overflow-hidden"
  >
    <div
      class="flex-none w-full p-4 flex justify-between items-center bg-black/50 backdrop-blur-md"
    >
      <button
        @click="emit('onBack')"
        class="text-xl font-bold px-3 py-1 rounded-lg border border-white/60 hover:bg-white/20 transition"
      >
        ← Back
      </button>
      <div class="text-2xl font-bold">⏱ {{ formattedTimer }}</div>
      <div class="text-2xl font-bold">Moves: {{ movesCount }}</div>
    </div>

    <div class="flex-1 min-h-0 flex items-center justify-center p-2 md:p-4">
      <div
        class="aspect-square w-[min(100%,calc(100vh-82px))] grid gap-1 sm:gap-2 md:gap-3"
        :class="gridColsClass"
      >
        <card-pokemon
          v-for="(card, index) in cardsContext"
          :key="index"
          :ref="(el) => (cardRefs[index] = el)"
          :imgUrl="`images/${card}.png`"
          :card="{ index: index, value: card }"
          :isFlipping="isFlipping"
          @onFlip="checkRule($event)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import CardPokemon from "./CardPokemon.vue";

const props = defineProps<{
  cardsContext: any[];
}>();

const emit = defineEmits<{
  (e: "onFinish", payload: { moves: number }): void;
  (e: "onBack"): void;
}>();

const rules = ref<any[]>([]);
const isFlipping = ref(false);
const cardRefs = ref<any[]>([]);
const movesCount = ref(0);
const matchedPairs = ref(0);
const elapsedSeconds = ref(0);
let timerInterval: number | undefined;

const formattedTimer = computed(() => {
  const m = Math.floor(elapsedSeconds.value / 60)
    .toString()
    .padStart(2, "0");
  const s = (elapsedSeconds.value % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
});

const gridColsClass = computed(() => {
  const count = props.cardsContext.length;
  if (count === 16) return "grid-cols-4 grid-rows-4";
  if (count === 36) return "grid-cols-6 grid-rows-6";
  if (count === 64) return "grid-cols-8 grid-rows-8";
  if (count === 100) return "grid-cols-10 grid-rows-10";
  return "grid-cols-4 grid-rows-4";
});

onMounted(() => {
  timerInterval = window.setInterval(() => {
    elapsedSeconds.value++;
  }, 1000);
});

onUnmounted(() => {
  if (timerInterval) clearInterval(timerInterval);
});

const checkRule = (card: any) => {
  if (isFlipping.value) return;
  if (rules.value.length === 2) return;

  rules.value.push(card);

  if (rules.value.length === 2) {
    isFlipping.value = true;
    movesCount.value++;

    if (rules.value[0].value === rules.value[1].value) {
      cardRefs.value[rules.value[0].index].onMaintainCard();
      cardRefs.value[rules.value[1].index].onMaintainCard();

      matchedPairs.value++;
      rules.value = [];
      isFlipping.value = false;

      if (matchedPairs.value === props.cardsContext.length / 2) {
        if (timerInterval) clearInterval(timerInterval);
        setTimeout(() => {
          emit("onFinish", { moves: movesCount.value });
        }, 920);
      }
    } else {
      setTimeout(() => {
        cardRefs.value[rules.value[0].index].onCloseBackCard();
        cardRefs.value[rules.value[1].index].onCloseBackCard();

        rules.value = [];
        isFlipping.value = false;
      }, 800);
    }
  }
};
</script>
