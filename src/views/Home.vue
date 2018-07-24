<template>
  <div class="p-home l">
    <app-post-modal v-if='postModal' :id='modalId' :index='modalIndex' @closePostModal='closePostModal($event)'/>
    <app-comments-modal v-if='commentsModal' :id='modalId' :index='modalIndex' @closePostModal='closeCommentsModal($event)'/>
    <div class="b-feed">
      <app-single-post v-for='(p, i) in feed' :key='i' :post='{data:p, i:i}'  v-on:showPostModal='togglePostModal($event)' v-on:showCommentsModal='toggleCommentsModal($event)'/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppSinglePost from '@/components/SinglePost.vue'
import AppPostModal from '@/components/modals/PostModal.vue'
import AppCommentsModal from '@/components/modals/CommentsModal.vue'
import { posts } from '@/api.js'

export default {
  name: 'home',
  data(){
    return{
      feed:[],
      postModal:false,
      commentsModal:false,
      modalId:'',
      modalIndex:''
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
    togglePostModal( data ){
      this.postModal = true;
      this.modalId = data.id;
      document.body.style.overflowY = "hidden";
    },
    toggleCommentsModal( data ){
      this.postModal = true;
      this.modalId = data.id;
      document.body.style.overflowY = "hidden";
    },
    closePostModal(){
      this.postModal = false;
      document.body.style.overflowY = "visible";
    },
    closeCommentsModal(){
      this.commentsModal = false;
      document.body.style.overflowY = "visible";
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
