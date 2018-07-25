<template lang="html">
   <div class="b-post-modal">
     <button class='c-btn--close-modal'type="button" @click='closePostModal'>X</button>
     <div class="b-post-modal__inner">
          <app-single-post :post='{ data:post, i:index }' v-if='show' v-on:showCommentsModal='toggleCommentsModal($event)'/>
     </div>
   </div>
</template>

<script>
import { posts } from '@/api.js'
import AppSinglePost from '@/components/SinglePost.vue'
export default {
  data(){
    return{
        post:{},
        show:false,
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
      this.$emit('closePostModal')
    },
    toggleCommentsModal( data ){
      console.log('I am in POST MODAL', data);
      this.$emit('pass', data)
    },
  },
  created(){
      posts.getById(this.id)
      .then( res => {
        console.log(res.data.data);
        this.post = res.data.data;
        this.show = true;
      })
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
  padding-top: 5rem;
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
}
</style>
