<template>
  <div class="p-home l">
    <app-post-modal v-if='post.show' :index='post.index' :postData='post.data' :postsIds='feedIds' @closePostModal='closePostModal($event)'  @updatePostModal='showPostModal($event)' @openCommentsModal='toggleCommentsModal($event)'/>
    <app-comments-modal v-if='commentsModal.show' :id='post.id' :index='post.Index' @closePostModal='closeCommentsModal($event)' v-on:showPostModal='togglePostModal($event)'/>
    <div class="b-feed">
      <app-single-post v-for='(post, index) in feed' :key='index' :post='{data:post, i:index}'  v-on:showPostModal='showPostModal($event)' v-on:showCommentsModal='toggleCommentsModal($event)'/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from '@/components/Header.vue'
import AppSinglePost from '@/components/SinglePost.vue'
import AppPostModal from '@/components/modals/PostModal.vue'
import AppCommentsModal from '@/components/modals/CommentsModal.vue'
import { posts } from '@/api.js'

export default {
  name: 'home',
  data(){
    return{
      feed:[],
      commentsModal:{
        show:false,
      },
      post:{
        show:false,
        id:'',
        index:0,
        data:{},
      }
    }
  },

  components: {
    AppSinglePost,
    AppPostModal,
    AppCommentsModal,
  },
  computed:{
    feedIds() {
      return this.feed.map( ( item )=> item.id );
    }
  },

  created(){
    posts.getList(1, 16).then((res) => {
        console.log(res.data.data)
        this.feed = res.data.data;
        console.log(this.feedIds);
    })
  },
  methods:{
    showPostModal( data ){
      this.post.show = false;
      posts.getById( data.id )
      .then( res => {
        this.post.data = res.data.data;
        this.post.id = data.id;
        this.post.index = data.index;
        this.post.show = true;
        document.body.style.overflowY = "hidden";
      });
    },
    toggleCommentsModal( data ){
      this.commentsModal.show = true;
      this.post.show = false;
      this.post.id = data.id;
      this.post.index = data.index;
      document.body.style.overflowY = "hidden";
    },
    closePostModal(){
      this.post.show = false;
      document.body.style.overflowY = "visible";
    },
    closeCommentsModal(){
      this.commentsModal.show = false;
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
    padding-top: 3rem;
    margin-top: 7.5rem;
    @include breakpoint(overPhone){
        flex-flow: row wrap;
    }
  }
</style>
