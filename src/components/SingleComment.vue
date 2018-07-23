<template lang="html">
  <div class="c-comment">
    <div class="c-comment__content">
      <div class="c-comment__content__img">
        <img :src='IMG + ( comment.data.user_image.comment ?comment.data.user_image.comment :comment.data.user_image.placeholder )' alt="">
      </div>
      <p class='c-comment__content__text'>{{comment.data.body}}</p>
    </div>
  </div>
</template>

<script>
import { IMG } from '@/api.js'
export default {
  data(){
       return {
           IMG:IMG,
       }
   },
   props: {
     comment:{
       type: Object,
       required: true
     }

    },
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";

.c-comment{
  margin-bottom: 1.7rem;
  &__content{
    &__img{
      width:28px;
      height: 28px;
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
      vertical-align: middle;
    }

    &__text{
      @include font-size(17px, 17px, 16px);
      @include line-height(20px, 20px, 18px)
      display: inline-block;
      margin-left: 1.2rem;
      vertical-align: top;
      padding-top: 1rem;
      width: 80%;
      text-align: left;
    }
  }
}
</style>
