<!-- eslint-disable vue/valid-template-root -->
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
    @onStartAgain="statusMatch = 'default'"
  />
</template>

<script>
import MainScreen from "./components/MainScreen.vue";
import InteractScreen from "./components/InteractScreen.vue";
import ResultScreen from "./components/ResultScreen.vue";
import { shuffled } from "./utils/array.js";
export default {
  name: "App",
  data() {
    return {
      settings: {
        totalOfBlocks: 0,
        cardsContext: [],
        startedAt: null,
      },
      statusMatch: "result",
      timer: 0,
    };
  },
  components: {
    MainScreen,
    InteractScreen,
    ResultScreen,
  },
  methods: {
    setStatusMatch(config) {
      console.log("running event", config);
      //phai co du lieu thi moi cho qua man choi game
      this.settings.totalOfBlocks = config.totalOfBlocks; // ban dau totalOfBlocks la` 0, nhung khi nguoi dung chon che do 4x4,6x6 thi totalOfBlocks se = voi config.totalOfBlocks
      // Nếu người dùng chọn chế độ 4x4, thì firstCards sẽ là mảng [1,2,3,4,5,6,7,8]
      const firstCards = Array.from(
        { length: this.settings.totalOfBlocks / 2 },
        (_, i) => i + 1
      );
      const secondCards = [...firstCards]; // [1,2,3,4,5,6,7,8]
      const cards = [...firstCards, ...secondCards]; //[1,...,16]
      this.settings.cardsContext = shuffled(cards); // random theo ham shuffled trong file utils/array.js
      this.settings.startedAt = new Date().getTime(); // bat dau thoi gian choi game khi nguoi dung chon che do
      // console.log(this.settings.cardsContext);

      this.statusMatch = "match";
    },
    onGetResult() {
      //get timer
      this.timer = new Date().getTime() - this.settings.startedAt;
      // switch result component
      this.statusMatch = "result";
    },
  },
};
</script>

<style></style>
