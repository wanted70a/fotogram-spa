<template lang="html">
  <div class="c-spinner" :class='{"fixed":this.position === "fixed", "absolute":this.position === "absolute"}'></div>
</template>

<script>
export default {
  props:['position']
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";

.c-spinner {
  display: inline-block;
  width: 51px;
  height: 51px;
  margin: 6px;
  border-radius: 50%;
  background: $color-green;
  animation: spinner 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  &.fixed{
    position: fixed;
  }
  &.absolute{
    position: absolute;
  }
}
@keyframes spinner {
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
}
</style>
