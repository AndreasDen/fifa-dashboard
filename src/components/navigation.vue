<template>
  <div class="navigation nav">
    <transition name="slide">
      <div class="navigation-icon" @click="toggleMenu()" v-if="!open" key="icon">
        <span class="bullet"></span>
      </div>
      <div class="navigation-routes" v-else key="routes">
        <router-link to='/team-overview' @click.native="toggleMenu()">Dashboard</router-link>
        <router-link to="/player-comparison" @click.native="toggleMenu()">Table</router-link>
        <router-link to="/player-overview" @click.native="toggleMenu()">Player</router-link>
        <router-link to="/new-game-form" @click.native="toggleMenu()">New Game</router-link>
        <router-link to="/new-game-form" @click.native="toggleMenu()">Profile</router-link>
        <div class="close" @click="toggleMenu()">x</div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "navigation",
  data: function () {
    return {
      mobile: false,
      open: false
    }
  },
  methods: {
    isMobile: function () {
      this.mobile = window.innerWidth < 768
    },
    toggleMenu: function () {
      this.open = !this.open
    }
  },
  created () {
    window.addEventListener('resize', this.isMobile())
  }
}
</script>

<style scoped lang="scss">
@import "src/scss/animations";
@import "src/scss/variables";

.navigation {

  position: fixed;
  z-index: 100;
}

.navigation-icon {
  display: flex;
  padding: 16px;

  .bullet {
    background: $color-blue;
    width: 32px;
    height: 32px;
    border-radius: 8px;
    animation: 2s pulse-box-shadow infinite;
  }
}

.navigation-routes {
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  height: 100vh;
  background: #0F0E1E;

  @media (min-width: 768px) {
    min-width: 10vw;
    max-width: 200px;
    border-right: 1px solid $color-blue;
  }


  a {
    text-decoration: none;
    color: #fff;
    padding: 16px;
    text-align: left;
    background: transparent;
    position: relative;
    font-family: Montserrat-Medium;
    z-index: 1;

    &:not(:last-child) {
      /*border-bottom: 1px solid #989898;*/
    }

    &:after {
      content: "";
      width: 100%;
      height: 100%;
      opacity: 0;
      background: $color-blue;
      transition: all .35s ease;
      position: absolute;
      left: 0;
      top: 0;
      z-index: -1;
    }

    &:hover, &.router-link-active {
      &:after {
        background: $color-blue;
        opacity: 1;
        transition: all 0s ease;
      }
    }
  }

  .close {
    color: $color-blue;
    position: absolute;
    bottom: 40px;
    transform: translateX(-50%);
    left: 50%;
    font-size: 40px;
    font-family: Montserrat-Medium;
    border-radius: 100%;
  }

}

.slide-enter {
  transform: translateX(-100vw);
  width: 0;
}

.slide-enter-active {
  transition: all .5s ease .2s;
  /*transition: transform .5s cubic-bezier(.21,.51,.6,1.25) .2s, width .5s ease .2s;*/
}

.slide-enter-to {
  transform: translateX(0);
  width: 100%;
}

.slide-leave, {
  /*opacity: 0;*/
}

.slide-leave-active {
  transition: all .5s;
}

.slide-leave-to {
  transform: translateX(-100%);
}


</style>
