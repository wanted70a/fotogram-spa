<template>
  <div id="app" class='main'>
    <app-header v-if='routeName' :isDesk='isDesktop' />
    <router-view />
    <app-footer-mobile v-if='isMobile && routeName'/>
  </div>
</template>

<script>
import { user } from '@/api.js'
import AppHeader from '@/components/Header.vue';
import AppFooterMobile from '@/components/FooterMobile.vue';

export default {
  data(){
    return{
      isMobile:false,
      isDesktop:false,
      logedUser:{},
      profPic:''
    }
  },
  mounted(){
    window.innerWidth > 767
    ?(this.isMobile = false, this.isDesktop = true )
    :(this.isMobile = true, this.isDesktop = false );
    console.log(this.$route.name != 'login');
  },
  computed:{
    routeName(){
      if( this.$route.name != 'login' && this.$route.name != 'register' ){
        return true;
      }else{
        return false;
      }
    }
  },
  components: {
    AppHeader,
    AppFooterMobile,
  },
}
</script>
