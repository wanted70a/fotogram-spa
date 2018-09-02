<template lang="html">
<transition name="slideRight">
  <div class="b-post-modal">
    <button class='c-btn--close-modal'type="button" @click='closePostModal'>X</button>
    <div class="b-post-modal__controls">
      <span class='b-post-modal__controls__l' @click='updatePost( --currentPostIndex )'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M34.52 239.03L228.87 44.69c9.37-9.37 24.57-9.37 33.94 0l22.67 22.67c9.36 9.36 9.37 24.52.04 33.9L131.49 256l154.02 154.75c9.34 9.38 9.32 24.54-.04 33.9l-22.67 22.67c-9.37 9.37-24.57 9.37-33.94 0L34.52 272.97c-9.37-9.37-9.37-24.57 0-33.94z"/></svg>
      </span>
      <span class='b-post-modal__controls__r' @click='updatePost( ++currentPostIndex )'>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
      </span>
    </div>
    <div class="b-post-modal__inner">
         <app-single-post :post='{ data:postData, i:index }' mediaSize='large' v-on:showCommentsModal='toggleCommentsModal($event)' v-on:newComment='newCommentAdded($event)'  @commentEdited='commentEdited($event)'  @commentRemoved='removeComment($event)'/>
    </div>
  </div>
</transition>
</template>

<script>
import { posts } from '@/api.js'
import AppSinglePost from '@/components/SinglePost.vue'
export default {
  data(){
    return{
        currentPostIndex: this.index,
        ids: this.postsIds
    }
  },

  props:{
    postsIds:{
      required:true,
    },
    postData:{
      required:true,
    },
    index:{
      required:true,
    },
  },

  methods:{
    closePostModal(){
      this.$emit('closePostModal');
    },
    toggleCommentsModal( data ){
      this.$emit('openCommentsModal', data)
    },
    updatePost( postIndex ){
      if( postIndex > ( this.ids.length - 1)){
        //if index bigger than posible
        this.currentPostIndex = ( this.ids.length - 1);
        return;
      }
      if( postIndex < 0 ){
        //if index < than 0
        this.currentPostIndex = 0;
        return;
      }
      this.$emit('updatePostModal', { id:this.postsIds[postIndex], index:postIndex } );
    },
    newCommentAdded( emitedData ){
      this.$emit('newComment', emitedData )
    },
    commentEdited(emitedData){
      this.$emit('commentEdited', emitedData );
    },
    removeComment( emitedData ){
      this.$emit('commentRemoved', emitedData);
    }
  },
  components:{
    AppSinglePost
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";

.b-post-modal{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.9);
  z-index: 12;
  padding-top: 11rem;
  @include breakpoint(overPhone){
      padding-top: 15rem;
  }

  &__inner{
      margin: 0 auto;
      width:48rem;

      .c-post{
          width: 100%;
          border: none;
          &:hover{
              border:none;
          }
      }
  }

  &__controls{
    color: white;
    fill: white;
    position: absolute;
    left: 11rem;
    right: 11rem;
    top: 43rem;

    @include breakpoint(overPhone){
      left: 48rem;
      right: 48rem;
      top: 43rem;
    }
    &__l{
      left: -10rem;
      width: 3.5rem;
      position: absolute;
      transition: fill 0.3s ease;
      &:hover{
        @include breakpoint(overPhone){
          fill:$color-green;
          cursor: pointer;
        }
      }
    }

    &__r{
      right:-10rem;
      width: 3.5rem;
      position: absolute;
      transition: fill 0.3s ease;
      &:hover{
        @include breakpoint(overPhone){
          fill:$color-green;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
