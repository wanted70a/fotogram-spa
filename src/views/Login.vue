<template lang="html">
  <div class="p-login">
    <h1 class='c-logo'><span>photo</span>gram</h1>
      <transition name="slideDown">
        <div class="b-login" v-if="show">
            <form class="b-login__form" >
              <div class="b-login__field">
                <input required class="b-login__input" type="text" name="" value="" placeholder='email' v-model='email'>
                <div class="b-login__icon b-login__icon--email">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/></svg>
                </div>
              </div>
              <div class="b-login__field">
                <input required class="b-login__input" type="password" name="" value="" placeholder='password' v-model='pass'>
                <div class="b-login__icon">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"/></svg>
                </div>
              </div>

              <div class="b-login__forgot-pass">
                <router-link :to="{ name: 'terms'}">Forgot Password?</router-link>
              </div>
              <button type="button" class='c-btn c-btn--login' @click='loginUser( { email:email, password:pass })'>
                Login
              </button>
              <div class="b-login__register">
                <p>Dont have account?  <router-link :to="{ name: 'register'}">REGISTER</router-link></p>
              </div>
            </form>
        </div>
      </transition>
  </div>
</template>
<script>
import { login } from '@/api.js'
export default {
  data(){
    return{
      pass:'1',
      email:'stefan.milic@diwanee.com',
      show:false,
    }
  },

  methods:{
    loginUser( data ){
      return login.login( data )
      .then( res => {
        localStorage.token = res.data.token;
        localStorage.userId = res.data.data.id;
        this.$router.push({name:'home'});
        this.$emit('userLoged')
      })
    }
  },

  mounted(){
    this.show = true;
    console.log(this.$data);
  }
}
</script>

<style lang="scss"  scoped>
@import "@/assets/scss/master-scss.scss";
body{
  margin-top: 0;
}
.p-login{
  padding-top: 10rem;
  width:100%;
  height:100vh;
  text-align: center;
  background: url('../assets/images/cover.jpeg') no-repeat center center fixed;
  background-size: cover;
  color:$color-white;
  @include breakpoint(overPhone){
    padding-top: 12rem;
  }
}
.c-logo{
  @include font-size( 50px, 24px, 70px);
  color:$color-white;
  font-family: 'Roboto', sans-serif;

  & span{
    font-family: 'Roboto-Bold', sans-serif;

  }
}
.b-login{
  margin: 0 auto;
  margin-top: 7rem;
  width:60%;
  max-width: 35rem;
  @include breakpoint(overPhone){
    width:45rem;
    max-width: none;
    margin-top: 10rem;
  }

  &__form{

  }

  &__field{
    position: relative;
    margin-top: 7rem;
  }

  &__input{
    width: 100%;
    border:none;
    border-bottom: 1px solid #303136;
    outline: none;
    padding: 1.1rem 4rem;
    background-color: rgba(0,0,0,0);
    color: white;
    @include breakpoint(overPhone){
        padding: 1.1rem 4rem;
    }
    &:invalid{
      border-bottom: 1px solid red;
    }

    &:valid{
      border-bottom: 1px solid $color-green;
    }
  }

  &__icon{
    width:2.3rem;
    height:2.3rem;
    position: absolute;
    z-index: 2;
    top:0;

    &--email{
      top: 3px;
      @include breakpoint(overPhone){
          top: 7px;
      }
    }

    & svg{
      fill:$color-green;
    }
  }

  &__forgot-pass{
    @include font-size(16px, 16px, 14px);
    text-align: left;
    margin-top: 3rem;
    @include breakpoint(overPhone){
      margin-top: 3rem;
    }

    & a{
      color:$color-green;
    }
  }

  &__register{
    @include font-size(16px, 16px, 14px);
    margin-top: 3rem;
    @include breakpoint(overPhone){
      margin-top: 3rem;
    }

    & a{
      color:$color-green;
      @include font-size(20px, 15px, 18px);
      font-weight: 700;
    }
  }
}
</style>
