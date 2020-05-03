<template>
  <div id="app">
    <div id="top">
      <div class="nav">
        <router-link to='/'>Team Overview</router-link>
        <router-link to="/player-comparison">Player Comparison</router-link>
        <router-link to="/player-overview">Player Overview</router-link>
        <router-link to="/new-game-form">New Game</router-link>
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

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #222840;
    margin-top: 60px;
    background: #131633;
  }
</style>
