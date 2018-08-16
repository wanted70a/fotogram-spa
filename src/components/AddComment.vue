<template lang="html">
  <div class="c-add-comment" :class="{ 'c-add-comment--modal':modal, 'c-add-comment--full':!modal }">
    <form class="c-add-comment__form">
      <div class="c-add-comment__form__text">
        <input type="text" name="" value="" placeholder='comment' v-model='userComment'>
        <button class="c-add-comment__form__submit" type="button" name="button" @click='submitComment'>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import { comments } from '@/api.js'
export default {
  data(){
    return {
      userComment:'',
    }
  },
  props:[ 'modal', 'postId', 'index'],
  methods:{
    submitComment(){
      if(this.userComment.length){
        comments.postNewById( { post_id:this.postId, body:this.userComment } )
        .then( (res) => {
          comments.getByPostId( this.postId, 1, 5)
          .then( res => {
            this.$emit('closeAddComment', {comments:res.data.data, index:this.index} );
          })
        })
        console.log('comment updat');
        this.userComment = '';
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";
.c-add-comment{

  &--full{
    width: 100%;
  }

  &--modal{
    margin: 0 auto;
    position: absolute;
    top: 31rem;
    left: 1rem;
    right: 1rem;
    @include breakpoint(overPhone){
      top: 31rem;
      left: 1rem;
      right: 1rem;
    }
  }
  &__form{
    position:relative;
    input{
      padding: 1.2rem 4rem 1.2rem 2rem;
      width: 100%;
      border-left: 0;
      border-right: 0;
      border-bottom: 1px solid $color-gray-light;
      border-top: 1px solid $color-gray-light;
      outline-color: transparent;
      outline: 0;
    }

    &__submit{
      width: 3rem;
      height: 3rem;
      right:1rem;
      background: $color-white;
      @include absolute(center-vertical);
      @include breakpoint(overPhone){
        width: 2.5rem;
        height: 2.5rem;
      }
      & svg{
        fill:$color-black-light;
        transition: all 0.15s ease;
        &:hover{
          fill:$color-green;
          cursor: pointer;
        }
      }
    }
  }
}

</style>
