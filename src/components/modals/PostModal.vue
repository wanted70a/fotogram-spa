<template lang="html">
   <div class="b-post-modal">
     <button type="button" @click='closePostModal'>CLOSE</button>
     <app-single-post :post='{ data:post, i:index }' v-if='show'/>
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
    }
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
  background: rgba(0,0,0,0.8);
  z-index: 2;
  text-align: center;
}
</style>
