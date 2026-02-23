<template>
  <div
    class="relative w-full h-full cursor-pointer"
    :class="{ 'cursor-default': isDisabled }"
    @click="onToggleFlipCard"
  >
    <div
      class="w-full h-full transition-transform duration-700 preserve-3d"
      :class="{ '[transform:rotateY(-180deg)]': isFlipped }"
    >
      <div
        class="absolute w-full h-full backface-hidden rounded-xl bg-[var(--dark)] p-[5%] shadow-lg"
      >
        <div
          class="w-full h-full bg-[url('@/assets/images/icon_back.png')] bg-no-repeat bg-center bg-contain opacity-50"
        ></div>
      </div>
      <div
        class="absolute w-full h-full backface-hidden rounded-xl bg-[var(--light)] p-[5%] [transform:rotateY(-180deg)] shadow-lg"
      >
        <div
          class="w-full h-full bg-contain bg-center bg-no-repeat"
          :style="{ backgroundImage: `url(${getImageUrl()})` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const props = defineProps<{
  imgUrl: string;
  card: any;
  isFlipping?: boolean;
}>();

const emit = defineEmits<{
  (e: "onFlip", card: any): void;
}>();

const isFlipped = ref(false);
const isDisabled = ref(false);

const onToggleFlipCard = () => {
  if (isDisabled.value || props.isFlipping || isFlipped.value) return;
  isFlipped.value = true;
  emit("onFlip", props.card);
};

const onCloseBackCard = () => {
  isFlipped.value = false;
};

const onMaintainCard = () => {
  isDisabled.value = true;
};

const getImageUrl = () => {
  return require(`@/assets/${props.imgUrl}`);
};

defineExpose({
  onCloseBackCard,
  onMaintainCard,
});
</script>

<style>
.preserve-3d {
  transform-style: preserve-3d;
}
.backface-hidden {
  backface-visibility: hidden;
}
</style>
