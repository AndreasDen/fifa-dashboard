<template>
  <div class="navigation">
    <transition name="hide" v-if="!open">
      <div class="navigation-icon" @click="toggleMenu()" key="icon">
        <span class="bullet"></span>
      </div>
    </transition>
    <transition name="slide" v-else>
      <div class="navigation-routes" key="routes">
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
  display: flex;
  z-index: 1;
  min-height: 60px;
  justify-content: center;
  width: 100%;
  background: #0F0E1E;
}

.navigation-icon {
  display: flex;
  padding: 16px;
  cursor: pointer;

  @media (min-width: 768px) {
    width: 100%;
  }

  .bullet {
    background: $color-blue;
    width: 28px;
    height: 28px;
    border-radius: 4px;
    animation: 2s pulse-box-shadow infinite;
  }
}

.navigation-routes {
  position: absolute;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  height: 100vh;
  background: #0F0E1E;

  @media (min-width: 768px) {
    flex-direction: row;
    padding-top: 8px;
    height: auto;
    padding-bottom: 8px;
    padding-left: 16px;
    align-items: center;
  }


  a {
    text-decoration: none;
    color: #fff;
    padding: 8px;
    text-align: left;
    background: transparent;
    position: relative;
    font-family: Montserrat-Medium;
    z-index: 1;
    margin: 4px;

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
      border-radius: 4px;
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
    align-self: center;
    margin-top: auto;
    margin-bottom: 32px;
    font-size: 24px;
    line-height: 24px;
    width: 28px;
    height: 28px;
    border: 1px solid;
    font-family: Montserrat-Medium;
    border-radius: 4px;
    cursor: pointer;
    text-align: center;

    @media (min-width: 768px) {
      position: relative;
      transform: none;
      left: 0;
      bottom: 0;
      margin: 8px;
      order: -1;
    }

    &:hover {
      color: #0F0E1E;
      background: $color-blue;
    }
  }

}


//----Transition-----
//---- slide-enter effects .navigation-routes on entering screen ---
.slide-enter {
  transform: translateX(-100%);

  @media (min-width: 768px) {
    transform: translateY(-100%);

    .close {
      transform: translateX(calc(-100% - 16px));
    }
  }
}

.slide-enter-active {
  transition: all .5s ease .5s;

  @media (min-width: 768px) {
    transition: transform .5s ease .5s, opacity 1.5s ease;

    .close {
      transition: transform .5s ease 1s;
    }
  }
}

.slide-enter-to {
  transform: translateX(0);

  @media (min-width: 768px) {
    transform: translateY(0);

    .close {
      transform: translateX(0);
    }
  }
}

//---- slide-leave effects .navigation-icon on leaving screen ---
.slide-leave, {
  transform: translateY(0);

  @media (min-width: 768px) {
    transform: translateX(0);
  }
}

.slide-leave-active {
  transition: all .5s;
}

.slide-leave-to {
  transform: translateY(-100%);

  @media (min-width: 768px) {
    transform: translateX(100%);
  }
}

//---- hide-enter effects .navigation-icon on entering screen ---
.hide-enter {
  @media (min-width: 768px) {
    transform: translateX(-100%);
  }
}

.hide-enter-to {
  @media (min-width: 768px) {
    transform: translateX(0);
  }
}

.hide-enter-active {
  @media (min-width: 768px) {
    transition: all .5s ease .5s;
  }
}

//---- hide-leave effects .navigation-routes on leave screen ---
.hide-leave, {
  transform: translateY(0);
  opacity: 1;

  .close {
    transform: translateY(0);
  }

  @media (min-width: 768px) {
    transform: translateX(100%);

    .close {
      transform: translateX(0);
    }
  }
}

.hide-leave-active {
  transition: transform .5s ease, opacity .5s ease .5s;

  .close {
    transition: transform .5s ease;
  }

  @media (min-width: 768px) {
    transition: transform .5s ease .5s, opacity .5s ease .5s;

    .close {
      transition: transform ease .5s;
    }
  }
}

.hide-leave-to {
  transform: translateY(calc(-100% + 60px));
  opacity: 0;

  .close {
    transform: translateY(16px);
  }

  @media (min-width: 768px) {
    opacity: 1;
    transform: translateY(-100%);

    .close {
      transform: translateX(calc(-100% - 16px));
    }
  }
}


</style>
