<template>
  <div
    class="card"
    :class="{ disabled: isDisabled }"
    :style="{
      // (920-16*4) là lấy tổng chiều dài trình duyệt trừ cho margin top bottom và chia cho tổng số lượng card, sau đó là - 16 khoảng cách margin top bottom
      height: `${(920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16}px`, // 920 là chiều dài của trình duyệt(thường là 1080 nhưng dùng 920 để dễ xử lý)
      width: `${
        (((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) / 4 // tính chiều rộng cho một card, tương tự như chiều cao nhưng tỉ lệ là h:4, w:3
      }px`,
    }"
  >
    <div
      class="card__inner"
      @click="onToggleFlipCard"
      :class="{ 'is-flipped': isFlipped }"
    >
      <div class="card__face card__face--front">
        <div
          class="card__content"
          :style="{
            backgroundSize: `${
              (((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) /
              4 /
              3
            }px ${
              (((920 - 16 * 4) / Math.sqrt(cardsContext.length) - 16) * 3) /
              4 /
              3
            }px`,
          }"
        ></div>
      </div>
      <div class="card__face card__face--back">
        <div
          class="card__content"
          :style="{ backgroundImage: `url(${require('@/assets/' + imgUrl)})` }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    imgUrl: {
      type: String,
      required: true,
    },
    card: {
      type: [String, Number, Array, Object],
    },
    isFlipping: {
      type: Boolean,
    },
    cardsContext: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      isFlipped: false,
      isDisabled: false,
    };
  },
  methods: {
    onToggleFlipCard() {
      if (this.isDisabled || this.isFlipping) return; // Nếu thẻ đã bị vô hiệu hóa hoặc đang lật thẻ khác, không thực hiện thao tác
      this.isFlipped = !this.isFlipped;
      if (this.isFlipped == true) this.$emit("onFlip", this.card); // có nghĩa là khi card được mở, nó sẽ lấy được giá trị của card nào đang được mở
      // console.log(this.card);
    },
    onCloseBackCard() {
      this.isFlipped = false;
    },
    onMaintainCard() {
      this.isDisabled = true;
    },
  },
};
</script>

<style lang="css" scoped>
.card {
  display: inline-block;
  margin-right: 1rem;
  margin-bottom: 1rem;
}

.card__inner {
  transition: transform 1s;
  transform-style: preserve-3d;
  cursor: pointer;
  position: relative;
  height: 100%;
  width: 100%;
}

.card.disabled .card__inner {
  cursor: default;
}

.card__inner.is-flipped {
  transform: rotateY(-180deg);
}

.card__face {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  overflow: hidden;
  border-radius: 1rem;
  padding: 1rem;
  background-color: var(--dark);
}

.card__face--front .card__content {
  background: url("../assets/images/icon_back.png") no-repeat center center;
  width: 100%;
  height: 100%;
}

.card__face--back {
  background-color: var(--light);
  transform: rotateY(-180deg);
}

.card__face--back .card__content {
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  height: 100%;
  width: 100%;
}
</style>
