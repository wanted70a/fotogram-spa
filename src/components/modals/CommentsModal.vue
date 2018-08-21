<template lang="html">
  <transition name="slideRight">
    <div class="b-comment-modal">
      <button class='c-btn--close-modal'type="button" @click='closePostModal'>X</button>
      <div class="b-comment-modal__inner">
        <div class="b-comment-modal__list">
          <app-single-comment v-for='( comment, i) in comments' :key='i' :comment='{ data:comment, index:i }'/>
        </div>
        <app-add-comment :postId='id' :index='index' @closeAddComment='closeAddComment($event)'/>
      </div>
    </div>
  </transition>
</template>

<script>
import { comments } from '@/api.js'
import AppSingleComment from '@/components/SingleComment.vue'
import AppAddComment from '@/components/AddComment.vue'
export default {
  data(){
    return{
        comments:[],
        show:false,
        page:1,
        amount:50
    }
  },
  props:{
    id:{
        required:true
      },
    index:{
      required:true
    }
  },
  methods:{
    closePostModal(){
      this.$emit('closePostModal');
    },
    closeAddComment( emitedData ){
      console.log(`I am in comentsModal`);
      console.log(emitedData);
      this.$emit('newComment', emitedData)
      comments.getByPostId( this.id, this.page, this.amount)
      .then( res => {
        this.comments = res.data.data;
      })
    }
  },
  created(){
      comments.getByPostId( this.id, this.page, this.amount)
      .then( res => {
        console.log(res.data.data);
        this.comments = res.data.data;
      })
  },
  components:{
    AppSingleComment,
    AppAddComment
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";

.b-comment-modal{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.9);
  z-index: 2;
  padding-top: 15rem;
  z-index: 13;
  &__inner{
      margin: 0 auto;
      position: relative;
      width:85%;
      height: 72vh;
      overflow-y: hidden;
      background: $color-white;
      @include breakpoint(overPhone){
        height: 48rem;
        width:48rem;
      }

      h1{
        color: white;
      }
  }

  &__list{
    padding: 2rem;
    height: 70vh;
    overflow-y: scroll;
    @include breakpoint(overPhone){
      height: 42rem;
    }
  }
}
</style>
