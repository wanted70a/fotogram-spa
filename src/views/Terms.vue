<template lang="html">
  <div class="p-terms">
    <!-- <h1 @click='showTest( {show:true, msg:'Hello World I am test' } )'>Terms Of Use</h1>
    <test @showTest='' :msgToShow='msg' :visibility='show'/> -->
    <h1>{{title}}</h1>
    <test  @changeTest='changeTitle($event)'/>
  </div>
</template>

<script>
import Test from '@/components/Test.vue'
export default {
  data(){
    return {
      title:'Naslov',
      show:false,
      msg:this.msgToShow
    }
  },
  methods:{
    showTest( payload ){
      this.$emit('showTest', payload );
      console.log('ShowTest Emited');
    },
    changeTitle( event){
      console.log(event);
      this.title = event;
    },
    red(){
      console.log(red);
    }
  },
  components:{
    Test
  }
}
</script>

<style lang="css">
</style>
