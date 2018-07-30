<template lang="html">
  <div class="p-notifications">
    <h2>New Post</h2>
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
.p-notifications{}
</style>
