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
@font-face {
    font-family: 'Comfortaa-Regular';
    src: url('fonts/Comfortaa-Regular.ttf');
}

@font-face {
    font-family: 'Comfortaa-Bold';
    src: url('fonts/Comfortaa-Bold.ttf');
    font-weight: bold;
}

body {
    background: #F4F4F4;
    font-family: 'Comfortaa-Bold';
    font-size: 14px;
}

#app {
    text-align: center;
    display: flex;

    #top {
        padding: 24px;
        border-right: 1px solid #989898;
        position: fixed;
        background: #F4F4F4;
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
            color: #898989;
            padding: 16px 0;
            position: relative;

            &:after {
                transition: all .35s ease;
                content: "";
                height: 15px;
                width: 100%;
                background: linear-gradient(90deg, rgba(30, 218, 171, 1) 0%, rgba(127, 251, 159, 1) 100%);
                position: absolute;
                bottom: 10px;
                z-index: -1;
                left: 10px;
                opacity: 0;
            }

            &:hover, &.router-link-active {
                color: #4f4f4f;

                &:after {
                    opacity: 1;
                    transition: all 0s ease;
                }
            }

        }
    }

}
</style>
