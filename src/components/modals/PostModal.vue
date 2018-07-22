<template lang="html">
  <div class="b-post-modal">
    MODAL is {{id}}
    <button type="button" @click='closePostModal'>CLOSE</button>
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
  methods:{
    closePostModal(){
      this.$emit('closePostModal')
    }
  }

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
