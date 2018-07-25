<template lang="html">
  <header class='b-header'>
      <nav class='b-header__nav'>
          <router-link :to="{ name: '', params: {} }" class='b-header__nav__link'>1</router-link>
          <router-link :to="{ name: '', params: {} }" class='b-header__nav__link'>2</router-link>
          <router-link :to="{ name: '', params: {} }" class='b-header__nav__link'>3</router-link>
          <router-link :to="{ name: '', params: {} }" class='b-header__nav__link'>4</router-link>
      </nav>
      <div class="b-header__breadcrumbs">
          <h1 class='c-logo'><span>photo</span>gram</h1>
      </div>
      <div class="b-header__util">
          <div class="b-header__util__search">
              SR
          </div>
          <div class="b-header__util__lang">
              LN
          </div>
      </div>
  </header>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "@/assets/scss/master-scss.scss";

.c-logo{
  @include font-size( 32px, 24px, 42px);
  color:$color-black;
  font-family: 'Roboto', sans-serif;

  & span{
    font-family: 'Roboto-Bold', sans-serif;

  }
}

.b-header{
    position:fixed;
    z-index: 10;
    border-bottom: 2px solid gray;
    top:0;
    left: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 7.5rem;
    width: 100%;
    background: $color-white;
    @include breakpoint(overPhone){
        padding: 0 5%;
    }
    &__nav{
        display: flex;
        justify-content: space-between;
        @include breakpoint(overPhone){
            width: 15rem;
        }
        &__link{
            width:3rem;
            height: 3rem;
            background: red;
        }
    }

    &__breadcrumbs{

    }
    &__util{
        display: flex;
        justify-content: space-between;
        @include breakpoint(overPhone){
            width: 8rem;
        }
        &__search{
            width:3rem;
            height: 3rem;
            background: red;
        }
        &__lang{
            width:3rem;
            height: 3rem;
            background: red;
        }
    }
}
</style>
