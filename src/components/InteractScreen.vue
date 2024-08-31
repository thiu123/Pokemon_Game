<template>
  <div class="screen">
    <div class="screen__inner">
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
      // Cách hoạt động: Khi ấn 2 thẻ cùng lúc thì thẻ 1 isFlipping vẫn là false và được thêm vào mảng rules
      // Thẻ 2 isFlipping vẫn là false và được thêm vào rules nhưng isFlipping lúc này sẽ là true vì length đã = 2.
      if (this.isFlipping == true) return; // Nếu đang lật thẻ khác, không thực hiện thao tác

      if (this.rules.length === 2) return false;
      this.rules.push(card); // Thêm phần tử vào mảng khi click

      if (this.rules.length === 2) {
        this.isFlipping = true; // Đánh dấu là đang lật thẻ

        if (this.rules[0].value === this.rules[1].value) {
          // thêm class diasbled 2 thẻ bài giống nhau
          this.$refs[`card-${this.rules[0].index}`][0].onMaintainCard();
          this.$refs[`card-${this.rules[1].index}`][0].onMaintainCard();
          // reset rules
          this.rules = [];
          this.isFlipping = false; // Kết thúc xử lý
          const disabledElements = document.querySelectorAll(
            ".screen .card.disabled"
          );
          console.log(disabledElements);

          if (
            disabledElements &&
            disabledElements.length == this.cardsContext.length - 2
          ) {
            setTimeout(() => {
              this.$emit("onFinish");
            }, 920);
          }
        } else {
          setTimeout(() => {
            // dùng setTimeout để tránh việc thẻ bài đầu tiên được mở bị úp khi chưa kịp check thẻ bài thứ 2
            // đóng 2 card
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
<style lang="css" scoped>
.screen {
  width: 100%;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  background-color: var(--dark);
  color: var(--light);
}

.screen__inner {
  width: 424px;
  display: flex;
  flex-wrap: wrap;
  margin: 2rem auto;
}
</style>
