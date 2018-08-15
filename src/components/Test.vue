<template lang="html">
  <div class='p-test'>
    <p @click='changeTest("New Title" + Math.random())'>{{msgToShow}}</p>
    <router-link :to="{ name: 'testchild' }">CHILDREN</router-link>
    <router-view />
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
    console.log('PARENT');
  },
  methods:{
    changeTest( newTest){
      this.$emit('changeTest', newTest );
      console.log('emited', newTest);
    }
  }
}
</script>

<style lang="scss" scoped>
.p-test{
    margin-top: 15rem;
}
</style>
