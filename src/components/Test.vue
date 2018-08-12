<template lang="html">
  <div>
    <p @click='changeTest("New Title" + Math.random())'>{{msgToShow}}</p>
  </div>
</template>

<script>
export default {

  data(){
    return {
      msgToShow:'Helloo data'
    }
  },
  created(){
    this.show = this.visibility;
    console.log(2);
  },
  methods:{
    changeTest( newTest){
      this.$emit('changeTest', newTest );
      console.log('emited', newTest);
    }
  }
}
</script>

<style lang="css">
</style>
