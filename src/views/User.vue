<template lang="html">
  <div class="p-user l">
    <app-user-info :user='user' :followings='authFollowings' @editUserProfile='editUser()'/>
    <app-post-modal v-if='post.show' :index='post.index' :postData='post.data' :postsIds='feedIds' @closePostModal='closePostModal($event)'  @updatePostModal='showPostModal($event)' @openCommentsModal='toggleCommentsModal($event)' v-on:newComment='newCommentAdded($event)'  @commentEdited='commentEdited($event)' @commentRemoved='removeComment($event)'/>
    <app-comments-modal v-if='commentsModal.show' :id='post.id' :index='post.index' :comments='commentsModal.comments' @closePostModal='closeCommentsModal($event)' v-on:showPostModal='togglePostModal($event)' v-on:newComment='newCommentAdded($event)'  @commentEdited='commentEdited($event)' @commentRemoved='removeComment($event)'/>
    <app-spinner position='fixed' v-if='spinner'/>
    <transition-group name="post-list" tag="div" class="b-feed">
      <app-single-post v-for='(post, index) in feed' :key='index' :post='{data:post, i:index}'
        v-on:showPostModal='showPostModal($event)'
        v-on:showCommentsModal='toggleCommentsModal($event)'
        v-on:newComment='newCommentAdded($event)'
        @commentEdited='commentEdited($event)'
        @commentRemoved='removeComment($event)'
        @postDeleted='removePost($event)'
      />
    </transition-group>
  </div>
</template>
<script>
// @ is an alias to /src
import AppHeader from '@/components/Header.vue'
import AppUserInfo from '@/components/UserInfo.vue'
import AppSinglePost from '@/components/SinglePost.vue'
import AppPostModal from '@/components/modals/PostModal.vue'
import AppCommentsModal from '@/components/modals/CommentsModal.vue'
import AppSpinner from '@/components/Spinner.vue'
import { posts, user, comments } from '@/api.js'

export default {
  name: 'home',
  data(){
    return{
      editUserProfile:false,
      spinner:true,
      feed:[],
      amount:16,
      page:1,
      user:{
        image:{
          profile_large:''
        }
      },
      authFollowings:[],
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
    AppUserInfo,
    AppSinglePost,
    AppPostModal,
    AppCommentsModal,
    AppSpinner,
  },
  computed:{
    feedIds() {
      return this.feed.map( ( item )=> item.id );
    }
  },

  created(){
    user.getById( this.$route.params.id )
    .then( res => {
      this.user = res.data.data;
    })
    posts.getByUserId( this.$route.params.id, this.page++, this.amount)
    .then((res) => {
        this.feed = res.data.data;
        this.spinner = false,
        window.addEventListener('scroll', this.scrollTrigger );
    });
    user.getFollowings(1, 50)
    .then( res=>{
      this.authFollowings = res.data.data.map(item => item.id)
    })
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
      this.$set(this.feed[emitedData.index], 'comments', emitedData.comments)
      this.$set(this.post.data, 'comments', emitedData.comments)

    },
    removeComment( emitedData ){
      this.$emit('commentRemoved', emitedData);
      this.$set(this.feed[emitedData.postIndex].comments[emitedData.index],'body', emitedData.commentText);
      this.feed[emitedData.postIndex].comments.splice(emitedData.index, 1);
      if( Object.keys(this.post.data).length){//check if obj is not empty
        this.post.data.comments.splice(emitedData.index, 1);
      }
      if(this.commentsModal.comments.length){
        this.commentsModal.comments.splice(emitedData.index, 1);
      }
    },
    commentEdited( emitedData ){
      this.$set(this.feed[emitedData.postIndex].comments[emitedData.index],'body', emitedData.commentText);
      if( Object.keys(this.post.data).length){//check if obj is not empty
          this.$set(this.post.data.comments[emitedData.index],'body', emitedData.commentText);
      }
      if(this.commentsModal.comments.length){
          this.$set(this.commentsModal.comments[emitedData.index],'body', emitedData.commentText);
      }
    },
    removePost(emitedData){
      this.$delete(this.feed, emitedData.index);
      posts.deleteById(emitedData.id)
    },
    scrollTrigger(){
        if( this.feed.length === this.user.posts_count ) {
          window.removeEventListener('scroll', this.scrollTrigger );
          console.log('NO MORE FEED');
        }
        var d = document.documentElement;
        var offset = d.scrollTop + window.innerHeight;
        var height = d.offsetHeight;
        if (offset > height - 150) {
          console.log('trigger');
          this.spinner = true,
            //fetch new posts adn psuh them to current feed array
            window.removeEventListener('scroll', this.scrollTrigger );
            posts.getByUserId(this.$route.params.id, this.page++, this.amount)
            .then((res) => {
                let newFeed = res.data.data;
                this.feed = [...this.feed, ...res.data.data ];
                this.spinner = false,
                window.addEventListener('scroll', this.scrollTrigger );
            });
        }
    },
    editUser(){
        console.log('EDIT USER TIRGERED');
        this.editUserProfile = true;
    }
  },

  watch: {
        '$route.params.id': function (newId, oldId) {
          this.page = 1;
          window.scrollTo(0,0);

          user.getById( newId )
          .then( res => {
            console.log('USER IS ');
            this.user = res.data.data;
            console.log(this.user);
          })
          posts.getByUserId( newId, 1, 16)
          .then((res) => {
            console.log('USER POSTS');
              console.log(res.data.data)
              this.feed = res.data.data;
              window.addEventListener('scroll', this.scrollTrigger );
          });;
         }
    },
}
</script>

<style lang="scss"  scoped>
@import "@/assets/scss/master-scss.scss";
.p-user{

}

.b-feed{
  display: flex;
  flex-flow: column wrap;
  justify-content: space-between;
  padding-top: 4.5rem;
  @include breakpoint(overPhone){
      flex-flow: row wrap;
  }
}
</style>
