<template lang="html">
  <div class="c-comment">
    <div class="c-comment__content">
      <div class="c-comment__content__img">
        <router-link :to="{ name: 'user', params: { id:comment.data.user_id } }">
          <img :src='IMG + ( comment.data.user_image.comment ?comment.data.user_image.comment :comment.data.user_image.placeholder )' alt="">
        </router-link>
      </div>
      <!-- <p class='c-comment__content__text'>{{comment.data.body}}</p> -->
      <input ref="commentInput" :class='{enable:edit}' class='c-comment__content__text' type="text" name="" :value="comment.data.body" :disabled='!edit'>
      <button v-if='edit' class="c-comment__submit" type="button" name="button" @click='submitComment'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"/></svg>
      </button>
    </div>
    <div class="c-comment__user-cta" v-if='comment.data.user_id == logedUserId'>
      <span class='edit' @click='toggleEdit'>
        <svg :class='{active:edit}' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px"  viewBox="0 0 528.899 528.899" style="enable-background:new 0 0 528.899 528.899;" xml:space="preserve">
	         <path d="M328.883,89.125l107.59,107.589l-272.34,272.34L56.604,361.465L328.883,89.125z M518.113,63.177l-47.981-47.981   c-18.543-18.543-48.653-18.543-67.259,0l-45.961,45.961l107.59,107.59l53.611-53.611   C532.495,100.753,532.495,77.559,518.113,63.177z M0.3,512.69c-1.958,8.812,5.998,16.708,14.811,14.565l119.891-29.069   L27.473,390.597L0.3,512.69z"></path>
         </svg>
      </span>
      <span class='delete' @click='toggleRemove'>
          <svg :class='{active:remove}' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" viewBox="0 0 459 459" style="enable-background:new 0 0 459 459;" xml:space="preserve">
		        <path d="M76.5,408c0,28.05,22.95,51,51,51h204c28.05,0,51-22.95,51-51V102h-306V408z M408,25.5h-89.25L293.25,0h-127.5l-25.5,25.5    H51v51h357V25.5z"></path>
          </svg>
      </span>
    </div>
  </div>
</template>

<script>
import { IMG } from '@/api.js'
import { comments } from '@/api.js'
export default {
  data(){
       return {
           IMG:IMG,
           logedUserId: window.localStorage.userId,
           edit:false,
           remove:false,
       }
   },
   props: {
     comment:{
       type: Object,
       required: true
    },
  },
  methods:{
    toggleEdit(){
      this.edit = !this.edit;
      this.$nextTick( () => this.$refs.commentInput.focus() );
    },

    toggleRemove(){
      this.remove = !this.remove;
  },

    submitComment(){
        this.edit = !this.edit;
        if( this.$refs.commentInput.value.length ){
          console.log('Emited from SINGLE COMMENT');
          console.log({comment:this.comment.data, index:this.comment.index, commentText:this.$refs.commentInput.value, postIndex:this.comment.postIndex});
          this.$emit('commentEdited',{comment:this.comment.data, index:this.comment.index, commentText:this.$refs.commentInput.value, postIndex:this.comment.postIndex});
          comments.updateById( this.comment.data.id, {body:this.$refs.commentInput.value})
        }
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";

.c-comment{
  margin-bottom: 1.7rem;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  width: 100%;

  &__content{
    width:calc(100% - 5rem);
    position: relative;

    &__img{
      width:28px;
      height: 28px;
      border-radius: 50%;
      overflow: hidden;
      display: inline-block;
      vertical-align: middle;
    }

    &__text{
      @include font-size(17px, 17px, 16px);
      @include line-height(20px, 20px, 18px)
      display: inline-block;
      margin-left: 1.2rem;
      vertical-align: top;
      padding-top: 1rem;
      width:calc(100% - 5.2rem);
      text-align: left;
      outline:none;
      border: 0;
      transition: all 0.3s ease;
      background: rgba(0,0,0,0);

      &.enable{
          border: 1px solid $color-gray-light;
          padding: 1rem;
          padding-right: 3rem;
          background: rgba(255, 255, 255,0.2);
      }
    }
  }

  &__user-cta{
      padding-top: 1.5rem;
      width: 7rem;

    & .edit{
      width: 2.5rem;
      display: inline-block;
      margin-right: 2rem;
      @include breakpoint(overPhone){
        width: 1.5rem;
        margin-right: 1.5rem;
        cursor: pointer;
      }
    }

    & .delete{
      width: 2.5rem;
      display: inline-block;
      margin-right: 2rem;
      @include breakpoint(overPhone){
        width: 1.5rem;
        margin-right: 1.5rem;
        cursor: pointer;
      }
    }

    & svg{
      fill:$color-black-light;
      transition: all 0.3s ease;
      &:hover{
        fill:$color-green;
      }

      &.active{
        fill:$color-green;
        transition: all 0.3s ease;
      }
    }
  }

  &__submit{
      width: 2rem;
      top: 0.8rem;
      position: absolute;
      right: 1.5rem;
      background: rgba(0,0,0,0);
      & svg{
        fill:$color-black-light;
        transition: all 0.15s ease;
        &:hover{
          fill:$color-green;
          cursor: pointer;
        }
      }
  }
}

.b-post-modal{
    .c-comment__content__text{
        color: white;
    }
}
</style>
