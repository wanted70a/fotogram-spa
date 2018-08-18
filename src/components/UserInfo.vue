<template lang="html">
  <div class="c-userinfo">
    <div class="c-userinfo__avatar">
        <p class='c-userinfo__avatar__name'>{{user.name}}</p>
        <div class="c-userinfo__avatar__img">
          <img :src='IMG + (user.image.profile_large ? user.image.profile_large : user.image.placeholder )' alt="">

        </div>
    </div>
    <div class="c-userinfo__stats">
      <ul>
        <li><span class='count'>{{user.posts_count}}</span><span class='label'>posts</span></li>
        <li><span class='count'>{{user.followers_count}}</span><span class='label'>followers</span></li>
        <li><span class='count'>{{user.following_count}}</span><span class='label'>following</span></li>
      </ul>
    </div>
  </div>
</template>

<script>
import { IMG } from '@/api.js'

export default {
  data(){
    return {
      IMG:IMG,
      userComment:'',
    }
  },
  props:[ 'user' ],
  methods:{

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
  width: 27rem;
  margin: 0 auto;

  &__avatar{
    &__name{
      text-align: center;
      color: #a3a4a6;
      @include font-size(14px, 16px, 17px);
    }
    &__img{
      width: 15rem;
      overflow: hidden;
      border-radius: 50%;
    }

  }

  &__stats{

  }
}

</style>
