<template lang="html">
  <div class="p-user">
    <h2>USER{{this.$route.params.id}}</h2>
  </div>
</template>
<script>
import { login } from '@/api.js'
export default {
  data(){
    return{
      show:false,
    }
  },

  methods:{

  },

  mounted(){

  }
}
</script>

<style lang="scss"  scoped>
@import "@/assets/scss/master-scss.scss";
.p-user{}
</style>
