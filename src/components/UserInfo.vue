<template lang="html">
  <div class="b-user">
    <div class="c-userinfo">
      <div class="c-userinfo__avatar">
          <p class='c-userinfo__avatar__name'>{{user.name}}</p>
          <div class="c-userinfo__avatar__img">
            <img :src='IMG + (user.image.profile_large ? user.image.profile_large : user.image.placeholder )' alt="">
          </div>
      </div>
      <div class="c-userinfo__stats">
        <ul>
          <li><span class='count'>{{user.posts_count}}</span><span class='label'> posts</span></li>
          <li><span class='count'>{{user.followers_count}}</span><span class='label'> followers</span></li>
          <li><span class='count'>{{user.following_count}}</span><span class='label'> following</span></li>
        </ul>
      </div>
    </div>
    <div class="c-user-cta">
      <router-link  v-if='userIsLogedUser' :to="{ name: 'editProfile' }" tag='button' class='c-btn c-btn--editprofile'>EDIT PROFILE</router-link>
      <button v-if='userIsLogedUser' type="button" ></button>
      <button v-if='userIsLogedUser' type="button" class='c-btn c-btn--logout' @click='logout()'>LOGOUT</button>
      <button v-if='!userIsLogedUser & !isFollowedByMe' type="button" class='c-btn'>FOLLOW</button>
      <button v-if='!userIsLogedUser & isFollowedByMe' type="button" class='c-btn c-btn--unfollow'>UNFOLLOW</button>
    </div>
  </div>
</template>

<script>
import { IMG, user } from '@/api.js'

export default {
  data(){
    return {
      IMG:IMG,
    }
  },
  props:[ 'user', 'followings' ],

  computed:{
    userIsLogedUser(){
      return window.localStorage.userId == this.user.id
    },
    isFollowedByMe(){
      if( this.followings.indexOf( this.$route.params.id ) == -1 ){
        return false;
      }else{
          return true;
      }
    }
  },
  methods:{
      editUser(){
          this.$emit('editUserProfile');
          console.log('editUserProfile');
      },
      logout(){
        localStorage.clear();
        this.$router.push({name:'login'})
      }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";

.c-userinfo{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 50rem;
  margin: 0 auto;
  padding-top: 3rem;

  &__avatar{
    &__name{
      text-align: center;
      color: #a3a4a6;
      @include font-size(14px, 16px, 17px);
      margin-bottom: 1rem;
    }
    &__img{
      width: 15rem;
      overflow: hidden;
      border-radius: 50%;
    }

  }

  &__stats{
    flex:1;
    padding-top: 4.5rem;
    padding-left: 3rem;

    ul{
      list-style: none;
      @include font-size(14px, 16px, 18px);

      li{
        margin-bottom: 1.5rem;
      }
    }

    .count{
      color: $color-green;
      width: 6rem;
      display: inline-block;

    }

    .label{
      color: $color-black-light;
      padding-left: 1rem;
    }
  }
}

.c-user-cta{
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  padding-top: 3rem;

  & .c-btn{
    margin: 0 1rem;
  }
}

</style>
