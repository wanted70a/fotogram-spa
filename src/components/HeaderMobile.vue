<template lang="html">
  <header class='b-header'>
      <nav class='b-header__nav'>
          <router-link :to="{ name: 'home', params: {} }" class='b-header__nav__link'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M488 312.7V456c0 13.3-10.7 24-24 24H348c-6.6 0-12-5.4-12-12V356c0-6.6-5.4-12-12-12h-72c-6.6 0-12 5.4-12 12v112c0 6.6-5.4 12-12 12H112c-13.3 0-24-10.7-24-24V312.7c0-3.6 1.6-7 4.4-9.3l188-154.8c4.4-3.6 10.8-3.6 15.3 0l188 154.8c2.7 2.3 4.3 5.7 4.3 9.3zm83.6-60.9L488 182.9V44.4c0-6.6-5.4-12-12-12h-56c-6.6 0-12 5.4-12 12V117l-89.5-73.7c-17.7-14.6-43.3-14.6-61 0L4.4 251.8c-5.1 4.2-5.8 11.8-1.6 16.9l25.5 31c4.2 5.1 11.8 5.8 16.9 1.6l235.2-193.7c4.4-3.6 10.8-3.6 15.3 0l235.2 193.7c5.1 4.2 12.7 3.5 16.9-1.6l25.5-31c4.2-5.2 3.4-12.7-1.7-16.9z"/></svg>
          </router-link>
          <router-link :to="{ name: 'user', params: { id: 123 }}" class='b-header__nav__link'>2</router-link>
          <router-link :to="{ name: 'newPost', params: {} }" class='b-header__nav__link'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"/></svg>
          </router-link>
          <router-link :to="{ name: 'notifications', params: {} }" class='b-header__nav__link'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z"/></svg>
          </router-link>
      </nav>
      <div class="b-header__breadcrumbs">
          <h1 class='c-logo'><span>photo</span>gram</h1>
      </div>
      <div class="b-header__util">
          <div class="b-header__util__search b-header__util__item">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"/></svg>
          </div>
      </div>
  </header>
</template>

<script>
export default {
  data(){
    return{
      isMobile:false,
      isDesktop:false,
    }
  },
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
    z-index: 15;
    border-bottom: 2px solid gray;
    top:0;
    left: 0;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    height: 7.5rem;
    width: 100%;
    padding: 0 5%;
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
            position: relative;
            width:3.5rem;
            height: 3.5rem;
            border-radius: 50%;
            cursor: pointer;
            background: white;
            border: 1px solid #232429;
            line-height: 3.5rem;
            text-align: center;
            overflow: hidden;
            transition: all 0.3s ease;

            &.router-link-exact-active {
             background-color: #232429;
             color: white;
             cursor: pointer;

             svg{
               fill: $color-green;
             }
           }

           svg{
             position: absolute;
             top:50%;
             left:50%;
             transform: translate(-50%, -50%);
             width: 50%;
           }

           &:hover{
              background-color: #232429;
              svg{
                 fill: $color-white;
                 color: white;
              }
           }
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
        &__item{
          position: relative;
          border-radius: 50%;
          cursor: pointer;
          background: white;
          border: 1px solid #232429;
          line-height: 3.5rem;
          text-align: center;
          overflow: hidden;
          width:3.5rem;
          height: 3.5rem;
        }
        &__search{
            svg{
              position: absolute;
              top:50%;
              left:50%;
              transform: translate(-50%, -50%);
              width: 50%;
            }
        }
    }
}
</style>
