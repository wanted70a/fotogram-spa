<template>
  <div class="p-home l">
    <app-post-modal v-if='post.show' :index='post.index' :postData='post.data' :postsIds='feedIds' @closePostModal='closePostModal($event)'  @updatePostModal='showPostModal($event)' @openCommentsModal='toggleCommentsModal($event)' v-on:newComment='newCommentAdded($event)'  @commentEdited='commentEdited($event)'/>
    <app-comments-modal v-if='commentsModal.show' :id='post.id' :index='post.index' :comments='commentsModal.comments' @closePostModal='closeCommentsModal($event)' v-on:showPostModal='togglePostModal($event)' v-on:newComment='newCommentAdded($event)'  @commentEdited='commentEdited($event)'/>
    <app-spinner position='fixed' v-if='spinner'/>
    <transition-group name="post-list" tag="div" class="b-feed">
      <app-single-post v-for='(post, index) in feed' :key='index' :post='{data:post, i:index}'  v-on:showPostModal='showPostModal($event)' v-on:showCommentsModal='toggleCommentsModal($event)' v-on:newComment='newCommentAdded($event)' @commentEdited='commentEdited($event)'/>
    </transition-group>
  </div>
</template>

<script>
// @ is an alias to /src
import AppHeader from '@/components/Header.vue'
import AppSinglePost from '@/components/SinglePost.vue'
import AppSpinner from '@/components/Spinner.vue'
import AppPostModal from '@/components/modals/PostModal.vue'
import AppCommentsModal from '@/components/modals/CommentsModal.vue'
import { posts, comments } from '@/api.js'

export default {
  name: 'home',
  data(){
    return{
      spinner:false,
      feed:[],
      amount:16,
      page:1,
      commentsModal:{
        show:false,
        comments:[],
        amount:30,
        page:1,
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
    AppSpinner
  },
  computed:{
    feedIds() {
      return this.feed.map( ( item )=> item.id );
    }
  },

  created(){
    this.spinner = true;
    posts.getList(this.page++, this.amount)
    .then((res) => {
        console.log(res.data.data)
        this.feed = res.data.data;
        this.spinner = false;
        window.addEventListener('scroll', this.scrollTrigger );
    });
  },

  destroyed: function () {
     window.removeEventListener('scroll', this.scrollTrigger );
  },
  methods:{
    showPostModal( data ){
      this.post.show = false;
      this.post.id = data.id;
      this.post.index = data.index;
      posts.getById( data.id )
      .then( res => {
        this.post.data = res.data.data;
        this.post.show = true;
        document.body.style.overflowY = "hidden";
        document.body.style.paddingRight = "15px";
      });
    },
    toggleCommentsModal( data ){
      this.commentsModal.show = false;
      this.post.show = false;
      this.post.id = data.id;
      this.post.index = data.index;
      comments.getByPostId( data.id, this.commentsModal.page, this.commentsModal.amount)
      .then( res => {
        this.commentsModal.comments = res.data.data;
        this.commentsModal.show = true;
        document.body.style.overflowY = "hidden";
        document.body.style.paddingRight = "15px";
      })

    },
    closePostModal(){
      this.post.show = false;
      document.body.style.overflowY = "visible";
      document.body.style.paddingRight = "0";
    },
    closeCommentsModal(){
      this.commentsModal.show = false;
      document.body.style.overflowY = "visible";
      document.body.style.paddingRight = "0";
    },
    newCommentAdded( emitedData ){
      console.log('HP new comment');
      console.log(emitedData);
      this.$set(this.feed[emitedData.index], 'comments', emitedData.comments)
      this.$set(this.post.data, 'comments', emitedData.comments)

    },
    scrollTrigger(){
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;
        if (offset > height - 150) {
          console.log('trigger');
          this.spinner = true;
            //fetch new posts adn psuh them to current feed array
            window.removeEventListener('scroll', this.scrollTrigger );
            posts.getList(this.page++, this.amount)
            .then((res) => {
                let newFeed = res.data.data;
                this.feed = [...this.feed, ...res.data.data ];
                this.spinner = false;
                window.addEventListener('scroll', this.scrollTrigger );
            });
        }
    },
    commentEdited( emitedData ){
      console.log('RECIEVED IN HP');
      console.log(emitedData);
      console.log(this.post.data.length);
      this.$set(this.feed[emitedData.postIndex].comments[emitedData.index],'body', emitedData.commentText);
      if( Object.keys(this.post.data).length){//check if obj is not empty
          this.$set(this.post.data.comments[emitedData.index],'body', emitedData.commentText);
      }
      if(this.commentsModal.comments.length){
          this.$set(this.commentsModal.comments[emitedData.index],'body', emitedData.commentText);
      }
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
    @include breakpoint(overPhone){
        flex-flow: row wrap;
    }
  }
</style>
