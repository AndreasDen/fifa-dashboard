<template>
  <div id="app">
    <div id="top">
      <navigation></navigation>
<!--      <div class="nav">-->

<!--&lt;!&ndash;        <router-link to='/team-overview'>DASHBOARD</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        <router-link to="/player-comparison">TABLE</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        <router-link to="/player-overview">PLAYER STATS</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        <router-link to="/new-game-form">NEW GAME</router-link>&ndash;&gt;-->
<!--&lt;!&ndash;        <router-link to="/new-game-form">PROFILE</router-link>&ndash;&gt;-->
<!--      </div>-->
    </div>
    <div id="content">
      <router-view :allData=allData :loaded="loaded"></router-view>
    </div>
  </div>
</template>
<script>

import Navigation from '../src/components/navigation'

export default {
  name: 'App',
  components: {
    Navigation
  },
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
    /*border-right: 1px solid #989898;*/
    /*position: fixed;*/
    /*height: 100vh;*/
  }

  #content {
    margin-left: 50px;
    width: 100%;
  }

  .nav {
    /*display: flex;*/
    /*flex-direction: column;*/

    a {
      /*text-align: left;*/
      /*text-decoration: none;*/
      /*color: #fff;*/
      /*padding: 16px;*/
      /*position: relative;*/
      /*background: transparent;*/

      &:after {
        /*<!--content: "";-->*/
        /*<!--width: 100%;-->*/
        /*<!--height: 100%;-->*/
        /*<!--opacity: 0;-->*/
        /*<!--background: $gradient-blue-to-turquise;-->*/
        /*<!--transition: all .35s ease;-->*/
        /*<!--position: absolute;-->*/
        /*<!--left: 0;-->*/
        /*<!--top: 0;-->*/
        /*<!--z-index: -1;-->*/
      }

      &:hover, &.router-link-active {

        &:after {
          /*<!--background: $gradient-blue-to-turquise;-->*/
          /*<!--opacity: 1;-->*/
          /*<!--transition: all 0s ease;-->*/
        }

      }


    }
  }

}

#chartjs-tooltip {
  transition: all .25s ease;
  position: absolute;

  .custom-legend {
    min-width: 80px;
    padding: 8px;
    color: #fff;
    position: relative;
    animation:  pulse-box-shadow 2s infinite;
    box-shadow: 0 0 0 $color-blue-transparent-4;
    border-radius: 4px;
    border: 1px solid $color-blue;
    background: $color-blue-transparent-8;
    height: auto;
    width: auto;

    div {

      > p {
        display: flex;
        justify-content: space-between;
        font-family: Montserrat-Medium;
        margin: 0;
        font-size: 12px;
        /*padding: 32px;*/
      }
    }

    &.custom-legend-radar {
      min-width: 40px;
      text-align: center;

      div {
        > p {
          justify-content: center;
        }
      }
    }
  }
}

</style>
