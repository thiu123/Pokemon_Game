<template>
  <div class="screen">
    <h1>✨ Congratulations ✨</h1>
    <h3>{{ Math.round(timer / 1000) }} seconds</h3>
    <button @click="onStartAgain()">Start Again</button>
  </div>
</template>

<script>
export default {
  props: {
    timer: {
      type: Number,
      required: true,
    },
  },
  methods: {
    onStartAgain() {
      this.$emit("onStartAgain");
    },
  },
};
</script>

<style lang="css" scoped>
.screen {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url("../assets/images/pokemon_bg.jpg") no-repeat center center /
    cover;
  color: var(--dark);
}
.screen h1 {
  font-size: 5rem;
}
.screen h3 {
  font-size: 3rem;
  margin-top: 1.5rem;
}
.screen button:hover {
  background-color: var(--dark);
  color: var(--light);
}
.screen button {
  font: var(--font);
  background: transparent;
  box-shadow: none;
  border: 1px solid var(--dark);
  color: var(--dark);
  margin: 1rem;
  padding: 1rem 1.25rem;
  border-radius: 0.5rem;
  font-size: 1.25rem;
  cursor: pointer;
  transition: 0.2s;
}
</style>
