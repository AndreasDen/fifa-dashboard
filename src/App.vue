<template>
  <div id="app">
    <div id="top">
      <div class="nav">
        <router-link to='/team-overview'>DASHBOARD</router-link>
        <router-link to="/player-comparison">TABLE</router-link>
        <router-link to="/player-overview">PLAYER STATS</router-link>
        <router-link to="/new-game-form">NEW GAME</router-link>
        <router-link to="/new-game-form">PROFILE</router-link>
      </div>
    </div>
    <div id="content">
      <router-view :allData=allData :loaded="loaded"></router-view>
    </div>
  </div>
</template>
<script>

export default {
  name: 'App',
  data () {
    return {
      loaded: false,
      allData: null
    }
  },
  watch: {
    allData: function () {
      this.loaded = true
    }
  },
  beforeCreate () {
    this.$axios.get('').then(response => (this.allData = response.data.players))
  }
}
</script>

<style lang="scss">
@import 'scss/variables';
@import 'scss/animations';

@font-face {
  font-family: 'Comfortaa-Regular';
  src: url('fonts/Comfortaa-Regular.ttf');
}

@font-face {
  font-family: 'Comfortaa-Bold';
  src: url('fonts/Comfortaa-Bold.ttf');
  font-weight: bold;
}

@font-face {
  font-family: 'Montserrat-Black';
  src: url('fonts/montserrat/Montserrat-Black.ttf');
}

@font-face {
  font-family: 'Montserrat-Medium';
  src: url('fonts/montserrat/Montserrat-Medium.ttf');
}

@font-face {
  font-family: 'Montserrat-Light';
  src: url('fonts/montserrat/Montserrat-Light.ttf');
}


body {
  font-family: 'Montserrat-Light';
  font-size: 14px;
  background: #0F0E1E;
  margin: 0;
  color: #fff;
}

#app {
  text-align: center;
  display: flex;

  #top {
    /*padding: 24px;*/
    border-right: 1px solid #989898;
    position: fixed;
    height: 100vh;
  }

  #content {
    margin-left: 175px;
    width: 100%;
  }

  .nav {
    display: flex;
    flex-direction: column;

    a {
      text-align: left;
      text-decoration: none;
      color: #fff;
      padding: 16px;
      position: relative;
      background: transparent;

      &:after {
        content: "";
        width: 100%;
        height: 100%;
        opacity: 0;
        background: $gradient-blue-to-turquise;
        transition: all .35s ease;
        position: absolute;
        left: 0;
        top: 0;
        z-index: -1;
      }

      &:hover, &.router-link-active {

        &:after {
          background: $gradient-blue-to-turquise;
          opacity: 1;
          transition: all 0s ease;
        }

      }


    }
  }

}


.custom-legend {
  color: #fff;
  position: relative;
  animation:  pulse-box-shadow 2s infinite;
  box-shadow: 0 0 0 $color-blue-transparent-4;
  border-radius: 4px;
  border: 1px solid $color-blue;
  background: $color-blue-transparent-8;
  height: 20px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;

  > p {
    font-family: Montserrat-Medium;
    margin: 0;
    /*padding: 32px;*/
  }
}
</style>
