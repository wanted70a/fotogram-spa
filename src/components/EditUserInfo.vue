<template lang="html">
  <div class="b-user">
    <div class="c-userinfo">
      <div class="c-userinfo__avatar">
          <p class='c-userinfo__avatar__name'>{{user.name}}</p>
          <div class="c-userinfo__avatar__img">
            <img :src='IMG + (user.image.profile_large ? user.image.profile_large : user.image.placeholder )' alt="">
          </div>
      </div>
    <div class="c-user-cta">
      <!-- <button v-if='userIsLogedUser' type="button" class='c-btn c-btn--editprofile'>EDIT PROFILE</button>
      <button v-if='userIsLogedUser' type="button" class='c-btn c-btn--logout'>LOGOUT</button>
      <button v-if='!userIsLogedUser & !isFollowedByMe' type="button" class='c-btn'>FOLLOW</button>
      <button v-if='!userIsLogedUser & isFollowedByMe' type="button" class='c-btn c-btn--unfollow'>UNFOLLOW</button> -->

    </div>
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
  props:[ 'user'],
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";
.b-user{
    position: fixed;
    top:0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 5;
    background: $color-white;
    @include breakpoint(overPhone){

    }
}
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
