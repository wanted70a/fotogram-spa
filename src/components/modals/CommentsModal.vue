<template lang="html">
   <div class="b-comment-modal">
     <button class='c-btn--close-modal'type="button" @click='closePostModal'>X</button>
     <div class="b-comment-modal__inner">
       <h1>COMMENTS {{id}}</h1>
            <app-single-comment v-for='( comment, i) in comments' :key='i' :comment='{ data:comment, index:i }'/>
     </div>
   </div>
</template>

<script>
import { comments } from '@/api.js'
import AppSingleComment from '@/components/SingleComment.vue'
export default {
  data(){
    return{
        comments:[],
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
      this.$emit('closePostModal');
    }
  },
  created(){
      comments.getByPostId( this.id, 1, 50 )
      .then( res => {
        console.log(res.data.data);
        this.comments = res.data.data;
        //this.show = true;
      })
  },
  components:{
    AppSingleComment
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
  padding-top: 5rem;
  z-index: 13;
  @include breakpoint(overPhone){
      padding-top: 15rem;
  }

  &__inner{
      margin: 0 auto;
      width:48rem;
      background: rgba(255,255,255,0.8);

      h1{
        color: white;
      }
  }
}
</style>
