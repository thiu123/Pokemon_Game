<template>
  <div class="screen">
    <h1>POKEMON GAME 🎮</h1>
    <h3>Select mode to start game</h3>
    <div class="actions">
      <button @click="onStart(16)">
        <span>4x4</span>
        <span>Easy</span>
      </button>
      <button @click="onStart(36)">
        <span>6x6</span>
        <span>Normal</span>
      </button>
      <button @click="onStart(64)">
        <span>8x8</span>
        <span>Hard</span>
      </button>
      <button @click="onStart(100)">
        <span>10x10</span>
        <span>Super Hard</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    onStart(totalOfBlocks) {
      this.$emit("onStart", { totalOfBlocks });
    },
  },
};
</script>
<style lang="css" scoped>
.screen {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background: url("../assets/images/pokemon_bg.jpg") no-repeat center center /
    cover;
  color: var(--dark);
}
h1 {
  font-size: 4.5rem;
  font-weight: bold;
  text-align: center;
}
h3 {
  font-size: 2rem;
  margin-top: 1rem;
}
.actions {
  display: flex;
}
.actions button:hover {
  background-color: var(--dark);
  color: var(--light);
}
.actions button {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 150px;
  height: 150px;
  border-radius: 1rem;
  margin: 20px 1rem;
  border: 1px solid var(--dark);
  cursor: pointer;
  background: transparent;
  color: var(--dark);
  font: var(--font);
  transition: 0.25s;
}
.actions button span {
  font-size: 2rem;
}
</style>
