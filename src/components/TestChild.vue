<template lang="html">
  <div class='p-test-child'>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {

  data(){
    return {
      msg:'Helloo, I AM CHILD ROUTE'
    }
  },
  created(){
    console.log('CHILD');
  },
}
</script>

<style lang="scss" scoped>
.p-test-child{

}
</style>
