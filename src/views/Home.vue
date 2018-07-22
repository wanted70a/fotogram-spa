<template>
  <div class="p-home l">
    <app-post-modal v-if='postModal' :id='modalId'/>
    <div class="b-feed">
      <app-single-post v-for='(p, i) in feed' :key='i' :post='{data:p, i:i}'  v-on:showPostModal='toggleModal($event)'/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppSinglePost from '@/components/SinglePost.vue'
import AppPostModal from '@/components/modals/PostModal.vue'
import { posts } from '@/api.js'

export default {
  name: 'home',
  data(){
    return{
      feed:[],
      postModal:false,
      modalId:null,
    }
  },
  components: {
    AppSinglePost,
    AppPostModal
  },
  created(){
  posts.getList(1, 16).then((res) => {
      console.log(res.data.data[9])
      this.feed = res.data.data;
    })
  },
  methods:{
    toggleModal( data ){
      this.postModal = true;
      this.modalId = data;
      document.body.style.overflow = "hidden";
      console.log( data );
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/scss/master-scss.scss";
  .b-feed{
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    @include breakpoint(overPhone){
        flex-flow: row wrap;
    }
  }
</style>
