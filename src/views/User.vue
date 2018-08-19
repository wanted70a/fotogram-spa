<template lang="html">
  <div class="p-user l">
    <app-spinner position='fixed' v-if='spinner'/>
    <app-user-info :user='user'/>
    <app-post-modal v-if='post.show' :index='post.index' :postData='post.data' :postsIds='feedIds' @closePostModal='closePostModal($event)'  @updatePostModal='showPostModal($event)' @openCommentsModal='toggleCommentsModal($event)' v-on:newComment='newCommentAdded($event)'/>
    <app-comments-modal v-if='commentsModal.show' :id='post.id' :index='post.index' @closePostModal='closeCommentsModal($event)' v-on:showPostModal='togglePostModal($event)' v-on:newComment='newCommentAdded($event)'/>
    <transition-group name="post-list" tag="div" class="b-feed">
      <app-single-post v-for='(post, index) in feed' :key='index' :post='{data:post, i:index}'  v-on:showPostModal='showPostModal($event)' v-on:showCommentsModal='toggleCommentsModal($event)' v-on:newComment='newCommentAdded($event)'/>
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
import { posts, user } from '@/api.js'

export default {
  name: 'home',
  data(){
    return{
      spinner:true,
      feed:[],
      user:{
        image:{
          profile_large:''
        }
      },
      amount:16,
      page:1,
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
    AppUserInfo,
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
    user.getById( this.$route.params.id )
    .then( res => {
      console.log('USER IS ');
      this.user = res.data.data;
      console.log(this.user);
    })
    posts.getByUserId( this.$route.params.id, this.page++, this.amount)
    .then((res) => {
      console.log('USER POSTS');
        console.log(res.data.data)
        this.feed = res.data.data;
        this.spinner = false,
        window.addEventListener('scroll', this.scrollTrigger );
    });
  },

  destroyed: function () {
     window.removeEventListener('scroll', this.scrollTrigger );
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
        document.body.style.paddingRight = "15px";
      });
    },
    toggleCommentsModal( data ){
      this.commentsModal.show = true;
      this.post.show = false;
      this.post.id = data.id;
      this.post.index = data.index;
      document.body.style.overflowY = "hidden";
      document.body.style.paddingRight = "15px";
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
  padding-top: 3rem;
  @include breakpoint(overPhone){
      flex-flow: row wrap;
  }
}
</style>
