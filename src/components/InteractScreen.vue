<template>
  <div class="screen">
    <h1>Interact component here</h1>
    <card-pokemon
      v-for="(card, index) in cardsContext"
      :key="index"
      :imgUrl="`images/${card}.png`"
    />
  </div>
</template>

<script>
import CardPokemon from "./CardPokemon.vue";
export default {
  props: {
    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  components: {
    CardPokemon,
  },
};
</script>
