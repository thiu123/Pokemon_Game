<template>
  <div class="screen">
    <h1>Interact component here</h1>
    <card-pokemon
      v-for="(card, index) in cardsContext"
      :key="index"
      :ref="`card-${index}`"
      :imgUrl="`images/${card}.png`"
      :card="{ index: index, value: card }"
      :isFlipping="isFlipping"
      @onFlip="checkRule($event)"
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
  data() {
    return {
      rules: [],
      isFlipping: false, // quá trình xử lý chưa diễn ra
    };
  },
  methods: {
    checkRule(card) {
      if (this.isFlipping == true) return; // Nếu đang lật thẻ khác, không thực hiện thao tác

      if (this.rules.length === 2) return false;
      this.rules.push(card); // Thêm phần tử vào mảng khi click

      if (this.rules.length === 2) {
        this.isFlipping = true; // Đánh dấu là đang lật thẻ

        if (this.rules[0].value === this.rules[1].value) {
          console.log("Matched!");
          this.$refs[`card-${this.rules[0].index}`][0].onMaintainCard();
          this.$refs[`card-${this.rules[1].index}`][0].onMaintainCard();
          this.rules = [];
          this.isFlipping = false; // Kết thúc xử lý
        } else {
          setTimeout(() => {
            // dùng setTimeout để tránh việc thẻ bài đầu tiên được mở bị úp khi chưa kịp check thẻ bài thứ 2
            //close two card
            this.$refs[`card-${this.rules[0].index}`][0].onCloseBackCard(); // ex:  card-0: [ Proxy(Object) ],
            this.$refs[`card-${this.rules[1].index}`][0].onCloseBackCard(); // ex:  card-1  [ Proxy(Object) ],
            // reset rules
            this.rules = [];
            this.isFlipping = false; // Kết thúc xử lý
          }, 800);
        }
      }
    },
  },
};
</script>
