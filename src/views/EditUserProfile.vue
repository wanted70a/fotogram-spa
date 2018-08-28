<template lang="html">
  <div class="b-user">
    <h1>Edit Page</h1>
    <div class="c-userinfo">
      <div class="c-userinfo__avatar">
          <div class="c-userinfo__avatar__img">
            <img :src='IMG + (user.image.profile_large ? user.image.profile_large : user.image.placeholder )' alt="">
          </div>
          <p class="c-userinfo__avatar__change">Change Photo</p>
      </div>
  </div>
  <form class="c-form" method="post">
    <input type="text" name="" value="" v-model='name'>
    <input type="text" name="" value="" v-model='username'>
    <input type="text" name="" value="" v-model='email'>
    <input type="text" name="" value="" v-model='gender'>
    <div class="c-user-cta">
      <button type="button" class='c-btn' @click='submitForm()'>SAVE</button>
      <button type="button" class='c-btn c-btn--logout'>LOGOUT</button>
    </div>
  </form>
</div>
</template>

<script>
import { IMG, user } from '@/api.js'

export default {
  data(){
    return {
      IMG:IMG,
      user:{
        image:{
          profile_large:''
        }
      },
      name:'',
      username:'',
      email:'',
      gender:'',
    }
  },
  created(){
    user.getById( window.localStorage.userId )
    .then( res => {
      this.user = res.data.data;
      this.name = this.user.name;
      this.username = this.user.username;
      this.email = this.user.email;
      this.gender = this.user.gender_id
      console.log(this.user);
    })
  },
  methods:{
    submitForm(){
      console.log(this.user);
      if( this.name != this.user.name || this.username != this.user.username || this.email !== this.user.email || this.gender !== this.user.gender_id ){
        user.updateInfo({ name:this.name, username:this.username, email:this.email, gender_id:this.gender })
      }else{
        console.log('no changes');
      }
    },
  },
  computed:{
    getGender(){
       if(this.gender == 1){ return 'male' }
       if(this.gender == 2){ return 'female' }
       if(this.gender == 3){ return 'other' }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";
.b-user{
  text-align: center;
  padding-top: 5rem;
  max-width: 60rem;
  margin: 0 auto;
  margin-top: 7.5rem;
  @include breakpoint(overPhone){

  }
  & h1{
    @include font-size(20px, 20px, 20px);
    color:$color-black-light;
  }
}
.c-userinfo{
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  padding-top: 3rem;

  &__avatar{
    &__img{
      width: 15rem;
      overflow: hidden;
      border-radius: 50%;
    }

    &__change{
      margin-top: 3rem;
      @include font-size(22px, 24px, 26px);
      cursor: pointer;
    }

  }
}

.c-form{
    margin-top: 4rem;
    input{
      outline:0;
      border: 0;
      border-bottom: 1px solid silver;
      width: 100%;
      margin-bottom: 7rem;
      @include breakpoint(overPhone){
        margin-bottom: 3.5rem;
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
