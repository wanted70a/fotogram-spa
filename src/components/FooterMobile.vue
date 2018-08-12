<template lang="html">
  <footer class='b-footer'>
      <nav class='b-footer__nav'>
          <router-link :to="{ name: 'home', params: {} }" class='b-footer__nav__link'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M488 312.7V456c0 13.3-10.7 24-24 24H348c-6.6 0-12-5.4-12-12V356c0-6.6-5.4-12-12-12h-72c-6.6 0-12 5.4-12 12v112c0 6.6-5.4 12-12 12H112c-13.3 0-24-10.7-24-24V312.7c0-3.6 1.6-7 4.4-9.3l188-154.8c4.4-3.6 10.8-3.6 15.3 0l188 154.8c2.7 2.3 4.3 5.7 4.3 9.3zm83.6-60.9L488 182.9V44.4c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12V117l-89.5-73.7c-17.7-14.6-43.3-14.6-61 0L4.4 251.8c-5.1 4.2-5.8 11.8-1.6 16.9l25.5 31c4.2 5.1 11.8 5.8 16.9 1.6l235.2-193.7c4.4-3.6 10.8-3.6 15.3 0l235.2 193.7c5.1 4.2 12.7 3.5 16.9-1.6l25.5-31c4.2-5.2 3.4-12.7-1.7-16.9z"/></svg>
          </router-link>
          <router-link :to="{ name: 'newPost', params: {} }" class='b-footer__nav__link'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
          </router-link>
          <router-link :to="{ name: 'user', params: { id: 123 }}" class='b-footer__nav__link'>
            <img v-if='userImage' :src='IMG + userImage' alt="">
          </router-link>
      </nav>
  </footer>
</template>

<script>
import { user, IMG } from '@/api.js'


export default {
    data(){
      return{
        IMG:IMG,
        userImage:''
      }
    },

    created(){
      user.getAuthUser( localStorage.userId )
      .then( res => {
        this.userImage = res.data.data.image.profile;
      })
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/master-scss.scss";

.c-logo{
  @include font-size( 32px, 24px, 42px);
  color:$color-black;
  font-family: 'Roboto', sans-serif;

  & span{
    font-family: 'Roboto-Bold', sans-serif;
  }
}

.b-footer{
    position:fixed;
    bottom: 0;
    z-index: 15;
    border-top: 1px solid gray;
    left: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 7.5rem;
    width: 100%;
    padding: 0 5%;
    background: $color-white;
    &__nav{
        display: flex;
        justify-content: space-between;
        width: 100%;
        &__link{
            position: relative;
            width:5rem;
            height: 5rem;
            border-radius: 50%;
            cursor: pointer;
            background: white;
            border: 1px solid #232429;
            line-height: 5rem;
            text-align: center;
            overflow: hidden;
            transition: all 0.3s ease;

            &.router-link-exact-active {
             background-color: #232429;
             color: white;
             cursor: pointer;

             svg{
               fill: $color-green;
             }
           }

           svg{
             position: absolute;
             top:50%;
             left:50%;
             transform: translate(-50%, -50%);
             width: 50%;
           }

           &:hover{
              background-color: #232429;
              svg{
                 fill: $color-white;
                 color: white;
              }
           }
        }
    }
}
</style>
