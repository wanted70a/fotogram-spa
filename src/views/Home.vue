<template>
  <div class="p-home l">
    <h1>Home page</h1>
    <div class="b-feed">
      <app-single-post v-for='(p, i) in feed' :key='i' :post='{data:p, i:i}'/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import AppSinglePost from '@/components/SinglePost.vue'
import { posts } from '@/api.js'

export default {
  name: 'home',
  data(){
    return{
      feed:[],
    }
  },
  components: {
    AppSinglePost
  },
  created(){
  posts.getList(1, 16).then((res) => {
      console.log(res.data.data[9])
      this.feed = res.data.data;
    })
  }
}
</script>

<style lang="scss">
  @import "@/assets/scss/master-scss.scss";
  .b-feed{
    display: flex;
    flex-flow: column wrap;
    justify-content: space-between;
    @include breakpoint(overPhone){
        flex-flow: row wrap;
    }
  }
</style>
