<template>
  <div id="app">
    <div id="top" :class="{'visible': showContent}">
      <navigation></navigation>
    </div>
    <div id="content">
      <transition name="fade">
        <router-view
            v-if='showContent'
            :dataDashboard=dataDashboard
            :dataScore=dataScore
            :dataComparison=dataComparison
            :loaded="dataLoaded"
            @player-selection-changed="getPlayersData"
        >
        </router-view>
        <div class="overlay" v-else>
          <div class="loading">
            <div class="loading-pulse loading-pulse-1"></div>
            <div class="loading-pulse loading-pulse-2"></div>
            <div class="loading-pulse loading-pulse-3"></div>
          </div>
          <p class="copy">loading</p>
        </div>
      </transition>
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
      dataLoaded: false,
      endOfAnimation: false,
      showContent: false,
      dataDashboard: null,
      dataScore: null,
      dataComparison: null
    }
  },
  watch: {
    dataDashboard: function () {
      this.dataLoaded = true
      this.showContent = this.endOfAnimation
    },
    endOfAnimation: function () {
      this.showContent = this.dataLoaded
    }
  },
  methods: {
    getPlayersData: function (data) {
      const serverPrefix= window.btoa('trvmp-prod');
      const serverPathComparison= window.btoa('pvp');

      if(data.playerOneID !== null && data.playerTwoID !== null) {
        this.$axios.get('https://'+window.atob(serverPrefix)+'.herokuapp.com/'+window.atob(serverPathComparison)+ '/' + data.playerOneID + '/' + data.playerTwoID).then(response => (this.dataComparison = response.data.pvp))
      }
    }
  },
  beforeCreate () {
    const serverPrefix= window.btoa('trvmp-prod');
    const serverPathDashboard= window.btoa('player_stats');
    const serverPathScore= window.btoa('games?amount=15');

    this.$axios.get('https://'+window.atob(serverPrefix)+'.herokuapp.com/'+window.atob(serverPathDashboard)).then(response => (this.dataDashboard = response.data.players))
    this.$axios.get('https://'+window.atob(serverPrefix)+'.herokuapp.com/'+window.atob(serverPathScore)).then(response => (this.dataScore = response.data))
  },
  mounted () {
    setTimeout(function () {
      this.endOfAnimation = true
    }.bind(this),4000)
  }
}
</script>

<style lang="scss">
@import 'scss/variables';
@import 'scss/animations';

@font-face {
  font-family: 'Sedgwick';
  src: url('fonts/SedgwickAveDisplay-Regular.ttf');
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
  font-size: 12px;
  background: $color-dark-blue;
  margin: 0;
  color: #fff;
  overflow-x: hidden;
  height: 100vh;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;

  #top {
    flex: 0 1;
    min-height: 60px;
    z-index: 2;
    opacity: 0;
    transition: opacity .5s ease 1s;

    &.visible {
      opacity: 1;
    }
  }

  #content {
    height: 100%;
    width: 100%;
    flex: 1 1;
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
    animation: pulse-box-shadow 2s infinite;
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

.overlay {
  background: $color-dark-blue;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .loading {
    display: flex;
  }

  .loading-pulse {
    animation: 2s pulse-box-shadow infinite -2s;
    border-radius: 4px;

    &.loading-pulse-2 {
      animation: 2s pulse-box-shadow infinite -1.5s;
    }

    &.loading-pulse-3 {
      animation: 2s pulse-box-shadow infinite -1s;
    }

    ~ .loading-pulse {
      margin-left: 32px;
    }
  }

  .copy {
    font-family: Sedgwick;
    font-size: 32px;
    transform: rotate(-7deg);
    color: $color-blue;
  }
}


//----Transition-----
.fade-enter-active {
  transition: opacity 0.3s ease .5s;
}

.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>
