<template lang="html">
  <div class="c-post">
    <div class="c-post__header">
      <div class="c-post__avatar">
          <router-link :to="{ name: 'user', params: { id:post.data.user_id } }" tag='div' class='c-post__avatar__img'>
              <img :src='IMG + ( post.data.user_image.avatar ? post.data.user_image.avatar : post.data.user_image.placeholder )' alt="">
          </router-link>
        <p class='c-post__avatar__name'>{{post.data.username}}</p>
      </div>
    </div>
    <div class="c-post__media" @click='showPostModal'>
      <div class="c-post__media__img" v-if='post.data.type_id === 1'>
          <img v-if='mediaSize' :src='IMG + ( post.data.media[mediaSize] ?post.data.media[mediaSize]  :post.data.media.placeholder )' alt="">
          <img v-else :src='IMG + ( post.data.media.medium ?post.data.media.medium  :post.data.media.placeholder )' alt="">
      </div>
      <div class="c-post__media__video" v-else='post.data.type_id === 1'>
            <video controls :src="IMG + post.data.media"  ></video>
      </div>
    </div>
    <transition name="showMe">
      <app-add-comment v-if='addComment' :class='{visible:addComment}' modal='true' :postId='post.data.id' :index='post.i' @closeAddComment='closeAddComment($event)'/>
    </transition>
    <div class="c-post__info">
      <div class="c-post__info__cta">
        <div class="c-post__info__like">
          <svg class='c-post__info__like__picto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"/>
          </svg>
        </div>
        <div class="c-post__info__comments" @click='showAddComment' :class='{active:addComment}'>
          <svg class='c-post__info__comments__picto' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path d="M256 32C114.6 32 0 125.1 0 240c0 49.6 21.4 95 57 130.7C44.5 421.1 2.7 466 2.2 466.5c-2.2 2.3-2.8 5.7-1.5 8.7S4.8 480 8 480c66.3 0 116-31.8 140.6-51.4 32.7 12.3 69 19.4 107.4 19.4 141.4 0 256-93.1 256-208S397.4 32 256 32z"/>
          </svg>
        </div>
      </div>
      <div class="c-post__info__stats">
          <p>{{post.data.likes_count}} people like this</p>
      </div>
    </div>
    <div class="c-post__comments" v-if='post.data.comments.length'>
      <app-single-comment v-for='( comment, i) in post.data.comments.slice(0,2)' :key='i' :comment='{ data:comment, index:i }'/>
      <div class="c-post__comments__all">
          <p  @click='showCommentsModal' v-if='post.data.comments.length > 2'>view all comments</p>
      </div>
    </div>
  </div>
</template>

<script>
import { IMG } from '@/api.js'
import AppSingleComment from '@/components/SingleComment.vue'
import AppAddComment from '@/components/AddComment.vue'
export default {
  data(){
       return {
           IMG:IMG,
           addComment:false,
       }
   },

   components:{
     AppSingleComment,
     AppAddComment,
   },
   props:{
     post:{
       type:Object,
       required:true
     },
     mediaSize:{
       type:String,
       required:false,
     }
   },
   methods:{
     showPostModal(){
       console.log(`emit showPostModal from SINGLEPOST.vue ${this.post.data.id}` );
       this.$emit('showPostModal', { id:this.post.data.id, index:this.post.i } );
     },
     showCommentsModal(){
         console.log(`emit showCommentsModal ${this.post.data.id}` );
         this.$emit('showCommentsModal', { id:this.post.data.id, index:this.post.i } );
     },
     showAddComment(){
       this.addComment  = !this.addComment;
     },
     closeAddComment( emitedData ){
       this.addComment = false;
       this.$emit('newComment', emitedData )
       console.log(emitedData);
     }
    },
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";
.c-post{
  position: relative;
  display: flex;
  flex-flow: column wrap;
  align-items: flex-start;
  width:100%;
  opacity: 1;
  margin-bottom: 3rem;
  transition: all 0.6s ease;
  border-bottom: 2px solid rgba(0,0,0,0);
  @include breakpoint(overPhone){
    width:24%;
  }

  &.hidden{
    opacity: 0;
  }
  &:hover{
      border-bottom: 2px solid black;
  }
  &__header{
    display: flex;
    justify-content: space-between;
    margin-bottom: 1.3rem;
  }
  &__avatar{
    &__img{
      width:44px;
      height: 44px;
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
      vertical-align: middle;
      cursor: pointer;
    }
    &__name{
      display: inline-block;
      margin-left: 1.2rem;
      vertical-align: middle;
      @include font-size(16px, 16px, 16px);
    }
  }
  &__media{
    margin-bottom: 1.5rem;
    width: 100%;
    @include breakpoint(overPhone){
        margin-bottom: 0.5rem;
    }
    &:hover{
        cursor: pointer;
    }
    &__img{
      width: 100%;
      & img{
        width:100%;
        max-width: none;
      }
    }

    &__video{

      & video{
        width: 100%;
        max-width: none;

      }
    }
  }
  &__info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 1rem;
    border-bottom: 1px solid silver;
    margin-bottom: 1.5rem;
    width: 100%;

    &__cta{
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__like{
      width: 4rem;
      @include breakpoint(overPhone){
          width: 2rem;
      }
      &__picto{
        fill:rgba(0,0,0,0);
        stroke:$color-green;
        stroke-width: 2rem;
        transition: all 0.3s ease;
        &:hover{
          @include breakpoint(overPhone){
            cursor: pointer;
            fill: $color-green;
          }
        }
        &.active{
            fill: $color-green;
          &:hover{
            @include breakpoint(overPhone){
              fill: rgba(0,0,0,0);
            }
          }
        }
      }
    }

    &__comments{
      width: 4rem;
      margin-left: 3rem;
      @include breakpoint(overPhone){
          width: 2rem;
          margin-left: 1rem;
      }
      &__picto{
        fill:$color-green;
        transition: all 0.3s ease;
        &:hover{
          @include breakpoint(overPhone){
            cursor: pointer;
            fill:$color-black;
          }
        }
      }

      &.active{
        svg{
           fill:$color-black;
        }
        &:hover{
          svg{
             @include breakpoint(overPhone){
               fill:$color-green;
             }
          }
        }
      }
    }
    &__stats{
      @include font-size(17px, 16px, 14px);
    }
  }

  &__comments{
    width: 90%;
    &__all{
        margin-bottom: 1rem;
        cursor: pointer;
    }
  }
}

.b-post-modal{
    .c-post__avatar__name, .c-post__info__stats, .c-post__comments__all{
        color: white;
    }
}
</style>
