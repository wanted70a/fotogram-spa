<template lang="html">
<div class="b-upload">
  <div class="c-upload">
    <h1>{{title}}</h1>
    <form class="c-upload__form" :class='{active:browserSupport}' method="post">
      <div class="c-upload__box">
        <input class="box__file" type="file" name="files[]" id="file"/>
        <label for="file"><strong>Choose a file</strong><span class="box__dragndrop"> or drag it here</span>.</label>
      </div>
      <button class="c-btn" type="submit">Upload</button>
      <div class="box__uploading">Uploading&hellip;</div>
      <div class="box__success">Done!</div>
      <div class="box__error">Error! <span></span>.</div>
    </form>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      title:'Upload Photo',
      browserSupport:false,
    }
  },
  created(){
    //check if browser supports drag and drop and FileReader
    var div = document.createElement('div');
    this.browserSupport = (('draggable' in div) || ('ondragstart' in div && 'ondrop' in div)) && 'FormData' in window && 'FileReader' in window;
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
        width: 100%;
        height: 100%;
      }
    }
  }

  &__box{
    position: relative;
    height: 40rem;
    width: 40rem;
    background-color: white;
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

.box__dragndrop,
.box__uploading,
.box__success,
.box__error {
  display: none;
}
</style>
