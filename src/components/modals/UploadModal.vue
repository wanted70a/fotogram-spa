<template lang="html">
<div class="b-upload">
  <div class="c-upload">
    <h1>{{title}}</h1>
    <form class="c-upload__form" ref='form' :class='{active: dragAndDropCapable}' method="post">
      <div class="c-upload__box" @click.stop='addFileManualy()'>
        <input v-if='fileInput' class="box__file" type="file" name="files[]" id="files" ref="files" accept="image/*"  v-on:change="onChange()"/>
        <button v-if='showPreview' class="box__file--remove" type="button" name="button" @click.stop='removeFile()'>
            <svg  class='remove' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512"><path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"/>
            </svg>
        </button>
        <img :src="imagePreview" v-show="showPreview" @click.stop=''/>
        <span class='c-upload__box__instruction'>Click here to chose file</span>
      </div>
      <button class="c-btn" :class='{disabled:!showPreview}' type="submit" :disabled='!showPreview' v-on:click.stop.prevent="submitFiles()">Upload</button>
    </form>
  </div>
</div>
</template>

<script>
import {user} from '@/api.js';

export default {
  data(){
    return{
      title:'Upload Photo',
      dragAndDropCapable:false,
      file:null,
      showPreview:false,
      imagePreview:'',
      fileInput: true,
    }
  },
  mounted(){
      this.dragAndDropCapable = this.ifDragAndDropCapable();
  },
  methods:{
      ifDragAndDropCapable(){
          var div = document.createElement('div');
          return ( ( 'draggable' in div )
                  || ( 'ondragstart' in div && 'ondrop' in div ) )
                  && 'FormData' in window
                  && 'FileReader' in window;
      },
      addFileManualy(){
          this.$refs.files.click();
      },
      submitFiles(){
          if( this.file){
              const formData = new FormData();
              formData.append('image', this.file, this.file.name )
              user.updateProfilePicture( formData )
              .then( (res)=>{
                  this.removeFile();
                  this.$emit('profilePictureChanged', this.imagePreview);
              })
          }
      },
      onChange(){
        this.file = this.$refs.files.files[0];
        let reader  = new FileReader();

        reader.addEventListener("load", function () {
              this.showPreview = true;
              this.imagePreview = reader.result;
        }.bind(this), false);

        if( this.file ){
          if ( /\.(jpe?g|png|gif)$/i.test( this.file.name ) ) {
            reader.readAsDataURL( this.file );
          }
        }
    },
    removeFile(){
        this.$refs.form.reset();
        this.showPreview = false;
        this.imagePreview = '';
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";
.b-upload{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.9);
  z-index: 12;
  padding-top: 11rem;
  @include breakpoint(overPhone){
      padding-top: 15rem;
  }
}

.c-upload{
  width: 80%;
  max-width: 60rem;
  margin: 0 auto;
  text-align: center;


  &__form{
    display: none;
    &.active{
      display: inline-block;
      .box__dragndrop{
        display: inline-block;
      }
      .box__file{
        display: none;
      }
      .box__file--remove{
          position: absolute;
          right: 3rem;
          top: 2rem;
          width: 3rem;
          z-index: 5;
          background: 0;
          transition: all 0.3s ease;
          &:hover{
              @include breakpoint(overPhone){
                  cursor: pointer;
                  fill:red;
                  stroke:red;
              }
          }
      }
    }
    img{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 2;
    }
  }

  &__box{
    position: relative;
    height: 40rem;
    width: 40rem;
    background-color: white;
    overflow: hidden;

    &__instruction{
        display: block;
        position: absolute;
        @include absolute(center)
    }
  }

  .c-btn{
    margin-top: 4rem;
  }

  h1{
    color: $color-white;
    @include font-size(22px, 24px, 26px);
    margin-bottom: 4rem;

  }
}

</style>
