<template lang="html">
  <div class="c-add-comment">
    <form class="c-add-comment__form">
      <div class="c-add-comment__form__text">
        <input type="text" name="" value="">
        <button class="c-add-comment__form__submit" type="button" name="button">Add</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data(){
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";
.c-add-comment{
  padding: 0 3rem;
  &__form{

    position:relative;
    input{
      padding-right: 5rem;
      width: 100%;
    }

    &__submit{
      position:absolute;
      right:1rem;
    }
  }
}
</style>
