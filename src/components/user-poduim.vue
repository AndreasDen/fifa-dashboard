<template>
  <div class="user-podium">
    <p class="badge">Top 3 - Elo</p>
    <div class="user-podium-numbers">
      <div class="user-elo-stat" :class="index === 2 ? 'leader' : ''" v-for="index in 3" :key="index">
        <font-awesome-icon v-if="index===2" icon="crown" />
        <p class="user-elo"
           v-if="podiumArray.length > 0">
          <!--         :style="{'background-image':'linear-gradient(45deg, '+gradientColors[0]+', '+gradientColors[1]+')'}">-->
          {{decimalPoint ? (countingNumber[index-1]/1000).toFixed(2) : countingNumber[index-1]}}</p><!--  index in v-for start with 1..      -->
        <p class="user-name" v-if="podiumArray.length > 0">
          <!--         :style="{'color':gradientColors[1]}">-->
          {{podiumArray[index-1][0]}}</p><!--  index in v-for start with 1..      -->

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user-poduim",
  props: {
    eloStats: Array,
    userNames: Array,
    decimalPoint: {
      default: false,
      type: Boolean
    },
  },
  data: function () {
    return {
      countingNumber: [],

      //this is going to filled like [[userName, eloStats], [userName, eloStats], .....]
      podiumArray: [],
    }
  },
  watch: {
    eloStats: function () {
      this.animateNumbers()
    }
  },
  methods: {
    animateNumbers: function () {

      //creates a array filled with 0,1,2... and same length than elo Array
      // needed to count up
      this.countingNumber = Array.from(this.eloStats, (x, i) => 0 + i);

      clearInterval(this.interval);

      if(this.eloStats.length === 0) {
        return;
      }

      //fill podiumArray to [[userName, eloStats], [userName, eloStats], .....]
      this.podiumArray = this.sortedArray(this.userNames, this.eloStats)

      //go through array an count up until elo point is reached
      this.podiumArray.map((elo, index) => {
        let elo_value = elo[1]

        if (elo_value === this.countingNumber[index]) {
          return;
        }

        this.interval = window.setInterval(function () {
          if (this.countingNumber[index] !== elo_value) {
            var change = (elo_value - this.countingNumber[index]) / 10;
            change = change >= 0 ? Math.ceil(change) : Math.floor(change);

            //set new Number to this.countingNumber array, this causes an update/rerender of this component
            this.$set(this.countingNumber, index, this.countingNumber[index] + change)
          }
        }.bind(this), 50);
      })
    },
    sortedArray: function (arr1, arr2) {
      //go through arr1 an return a sorted array in array structure
      let list = arr1.map((arr1Value, index) => [arr1Value, arr2[index]])
      list.sort(function (a, b) {
        return ((a[1] > b[1]) ? -1 : ((a[1] === b[1]) ? 0 : 1));
      })

      //sort array like podium 2, 1, 3
      let temp = list[0];
      list[0] = list[1];
      list[1] = temp;

      return list
    }
  },
  mounted () {
    this.animateNumbers()
  }
}
</script>

<style scoped lang="scss">
.user-podium {
  width: 280px;
  position: relative;

  .user-podium-numbers {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    background: linear-gradient(90deg, rgba(30, 218, 171, 1) 0%, rgba(127, 251, 159, 1) 100%);
    padding: 24px;
    border-radius: 8px;
    position: relative;
    color: #0F0E1E;
  }

  .badge {
    /*background: linear-gradient(90deg, rgba(30, 218, 171, 1) 0%, rgba(127, 251, 159, 1) 100%);*/
    /*-webkit-background-clip: text;*/
    /*-webkit-text-fill-color: transparent;*/
    /*-moz-background-clip: text;*/
    /*-moz-text-fill-color: transparent;*/
    font-family: Montserrat-Black;
    font-size: 14px;
    position: absolute;
    right: 15px;
    top: 10px;
    color: #0F0E1E;
    z-index: 1;
    margin: 0;
  }


  .user-elo-stat {
    position: relative;

    &.leader {
      margin: 0 32px;
    }
  }

  .user-name {
    font-family: Montserrat-Black;
    margin: 0;
  }

  .user-elo {
    margin: 0;
    font-size: 18px;
  }
}
</style>
