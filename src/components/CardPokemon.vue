<template>
  <div class="card" :class="{ disabled: isDisabled }">
    <div
      class="card__inner"
      @click="onToggleFlipCard"
      :class="{ 'is-flipped': isFlipped }"
    >
      <div class="card__face card__face--front">
        <div class="card__content"></div>
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
  width: 90px;
  height: 120px;
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
  box-shadow: 0px 3px 10px 3px rgba(0, 0, 0, 0.2);
}

.card__face--front .card__content {
  background: url("../assets/images/icon_back.png") no-repeat center center;
  background-size: 60px 60px;
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
