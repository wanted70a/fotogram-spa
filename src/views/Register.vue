<template lang="html">
  <div class="p-register">
    <h1 class='c-logo'><span>photo</span>gram</h1>
    <transition name="slideDown">
      <div class="c-register" v-if='show'>
          <form class="c-register__form" >
            <div class="c-register__field">
              <input required class="c-register__input" type="email" name="" value="" placeholder='email' v-model='email'>
              <div class="c-register__icon c-register__icon--email">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M502.3 190.8c3.9-3.1 9.7-.2 9.7 4.7V400c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V195.6c0-5 5.7-7.8 9.7-4.7 22.4 17.4 52.1 39.5 154.1 113.6 21.1 15.4 56.7 47.8 92.2 47.6 35.7.3 72-32.8 92.3-47.6 102-74.1 131.6-96.3 154-113.7zM256 320c23.2.4 56.6-29.2 73.4-41.4 132.7-96.3 142.8-104.7 173.4-128.7 5.8-4.5 9.2-11.5 9.2-18.9v-19c0-26.5-21.5-48-48-48H48C21.5 64 0 85.5 0 112v19c0 7.4 3.4 14.3 9.2 18.9 30.6 23.9 40.7 32.4 173.4 128.7 16.8 12.2 50.2 41.8 73.4 41.4z"/></svg>
              </div>
            </div>
            <div class="c-register__field">
              <input required class="c-register__input" type="password" name="" value="" placeholder='password'  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters" v-model='pass'>
              <div class="c-register__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"/></svg>
              </div>
            </div>
            <div class="c-register__field">
              <input required class="c-register__input" type="password" name="" value="" placeholder='confirm password' v-model='passConfirm'>
              <div class="c-register__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"/></svg>
              </div>
            </div>
            <div class="c-register__field">
              <input required class="c-register__input" type="text" name="" value="" placeholder='username' v-model='user'>
              <div class="c-register__icon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"/></svg>
              </div>
            </div>
            <div class="c-register__terms">
              <p>I accept to the  <router-link :to="{ name: 'terms'}">Terms and Privacy Policy</router-link></p>
            </div>
            <button type="button" class='c-btn c-btn--signup' @click='registerUser( { username:user, email:email, password:pass, password_confirmation:passConfirm })'>
              Sign Up
            </button>
            <div class="c-register__login">
              <p>Already have accoount?  <router-link :to="{ name: 'login'}">LOG IN</router-link></p>
            </div>
          </form>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data(){
    return{
      show:false,
      user:'stefan',
      email:'stef@test.com',
      pass:'Stefan123',
      passConfirm:'Stefan123',
    }
  },
  methods:{
    registerUser( data ){
      if( ( register.validate( data ) ) && ( this.pass === this.passConfirm ) ){
          return register.newUser( data )
          .then(res => console.log(res))
      }
      // register.test()
      // .then( res => console.log(res) )
    }
  },

  mounted(){
    this.show = true;
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";

.p-register{
  padding-top: 5rem;
  text-align: center;
  @include breakpoint(overPhone){
    padding-top: 12rem;
  }
}
.c-logo{
  @include font-size( 50px, 24px, 70px);
  color:$color-black;

  & span{
    font-family: 'Roboto-Bold', sans-serif;
  }
}
.c-register{
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
    padding: 0.4rem 4rem;
    @include breakpoint(overPhone){
        padding: 0.8rem 4rem;
    }
    &:invalid{
      border-bottom: 1px solid red;
    }

    &:valid{
      border-bottom: 1px solid $color-green;
    }
  }

  &__icon{
    width:2.5rem;
    height:2.5rem;
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

  &__terms{
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

  &__login{
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
