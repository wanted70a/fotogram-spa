<template lang="html">
  <div class="b-post-modal">
    MODAL is {{id}}
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  props:{
    id:{
        type:Number,
        required:true
      }
  },

}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/master-scss.scss";
body{
  overflow: hidden;
}
.b-post-modal{
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0,0,0,0.8);
  z-index: 2;
}
</style>
