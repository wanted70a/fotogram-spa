<template lang="html">
  <div class="b-user">
    <app-upload-modal v-if='uploadPhoto' @profilePictureChanged='updateProfilePicture()'></app-upload-modal>
    <h1>Edit Page</h1>
    <div class="c-userinfo">
      <div class="c-userinfo__avatar">
          <div class="c-userinfo__avatar__img">
            <img :src='IMG + (user.image.profile_large ? user.image.profile_large : user.image.placeholder )' alt="">
          </div>
          <button class="c-userinfo__avatar__change" @click='uploadPhoto=true'>Change Photo</button>
      </div>
  </div>
  <form class="c-form" method="post">
    <input class='text' type="text" name="" value="" v-model='name'>
    <input class='text' type="text" name="" value="" v-model='username'>
    <div class="c-form__radio">
      <input class='radio' type="radio" id="male" value="1" v-model="picked">
      <label for="male">Male</label>
      <input class='radio' type="radio" id="female" value="2" v-model="picked">
      <label for="female">Female</label>
      <input class='radio' type="radio" id='other' value="3" v-model="picked">
      <label for="other">Other</label>
    </div>
    <div class="c-user-cta">
      <button type="button" class='c-btn' @click='submitForm()'>SAVE</button>
      <button type="button" class='c-btn c-btn--logout' @click='logout()'>LOGOUT</button>
    </div>
  </form>
</div>
</template>

<script>
import { IMG, user } from '@/api.js';
import AppUploadModal from '@/components/modals/UploadModal.vue'

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
      picked:'',
      uploadPhoto:false,
    }
  },
  created(){
      this.fetchThisPage();
  },
  methods:{
    submitForm(){
      console.log(this.user);
      if( this.name != this.user.name || this.username != this.user.username || this.picked !== this.user.gender_id ){
        user.updateInfo({ name:this.name, username:this.username, email:this.email, gender_id:this.picked })
      }else{
        console.log('no changes');
      }
    },
    logout(){
      localStorage.clear();
      this.$router.push({name:'login'})
    },
    updateProfilePicture( emitedData ){
         this.fetchThisPage();
         this.uploadPhoto = false;
         this.$emit('profilePictureChanged');
    },
    fetchThisPage(){
        user.getById( window.localStorage.userId )
        .then( res => {
          this.user = res.data.data;
          this.name = this.user.name;
          this.username = this.user.username;
          this.picked = this.user.gender_id;
        })
    }
  },
  components:{
    AppUploadModal,
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
    &__radio{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 3.5rem;


      .radio{
        margin-right: 1rem;
      }

      label{
        margin-right: 4rem;
        @include font-size(22px, 24px, 26px);
        @include breakpoint(overPhone){
          margin-right: 3rem;
        }
      }
    }

    input.text{
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
  padding-top: 5rem;

  & .c-btn{
    margin: 0 1.5rem;
  }
}
</style>
