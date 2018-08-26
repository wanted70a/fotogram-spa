<template lang="html">
  <div class="c-remove-post-modal">
    <div class="remove-icon" @click.stop='togglePopup()'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/></svg>
    </div>
    <div class='popup' v-if='popup' @click.stop=''>
      <h3>Delte this post ?</h3>
      <div class="popup__cta">
        <button class='c-btn c-btn--yes' type="button" @click.stop='removePost()'> YES </button>
        <button class='c-btn c-btn--no' type="button" @click.stop='keepPost()'> NO </button>
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data(){
    return {
      popup:false
    }
  },
  props:['data'],
  methods:{
    togglePopup(){
      this.popup = !this.popup;
    },
    removePost(){
        this.popup = false;
        this.$emit('postDeleted', this.data);
        console.log('POSTE DELETED', this.data);
    },
    keepPost(){
      this.popup = false;
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";

.c-remove-post-modal{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  & .popup{
    width: 100%;
    position: absolute;
    top:0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column nowrap;
    & h3{
      @include font-size(20px, 20px, 24px);
      color: $color-white;
      margin-bottom: 2rem;
    }
    & .popup__cta{
      & .c-btn{
        margin: 0 1rem;
      }
    }
  }

  & .remove-icon{
    transition: opacity 0.3s ease;
    width: 3.5rem;
    position: absolute;
    right: 2rem;
    top: 1.4rem;
    cursor: pointer;
    @include breakpoint(overPhone){
      width: 2rem;
    }
    & svg{
      fill:#d63031;
    }
  }
}

</style>
