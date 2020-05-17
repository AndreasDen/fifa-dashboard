<template>
  <div class="leader-badge">
    <p class="badge" v-for="(number, index) in countingNumber" :key="index">
      <span>{{number[0]}}: </span><span>{{decimalPoint ? (number[1]/1000).toFixed(2) : number[1]}}</span>
    </p>
    <font-awesome-icon icon="crown"/>
  </div>
</template>

<script>
export default {
  name: "leader-badge",
  props: {
    leaderData: Array,
    userNames: Array,
    decimalPoint: {
      default: false,
      type: Boolean
    },
  },
  data: function () {
    return {
      countingNumber: [],

      //this is going to filled like [[userName, leaderData], [userName, leaderData], .....]
      leaderArray: [],
    }
  },
  watch: {
    leaderData: function () {
      this.animateNumbers()
    }
  },
  methods: {
    animateNumbers: function () {

      //fill leaderArray to [[userName, leaderData], [userName, leaderData], .....]
      this.leaderArray = this.sortedArray(this.userNames, this.leaderData)

      if (this.countingNumber.length === 0) {
        //creates a duplicated array from leaderData array, filled with 0..... to count up
        this.countingNumber = this.leaderArray.map(arr => [arr[0], 0]);
      }

      if (this.leaderData.length === 0) {
        return;
      }

      clearInterval(this.interval);

      // go through array an count up until elo point is reached
      this.leaderArray.map((arr, arrIndex) => {
        let data_value = arr[1]

        if (data_value === this.countingNumber[arrIndex][1]) {
          return;
        }

        this.interval = window.setInterval(function () {
          if (this.countingNumber[arrIndex][1] !== data_value) {

            var change = (data_value - this.countingNumber[arrIndex][1]) / 10;
            change = change >= 0 ? Math.ceil(change) : Math.floor(change);

            //set new Number to this.countingNumber array, this causes an update/rerender of this component
            this.$set(this.countingNumber, arrIndex, ([this.countingNumber[arrIndex][0], this.countingNumber[arrIndex][1] + change]))
          }
        }.bind(this), 25);
      })

    },
    sortedArray: function (arr1, arr2) {
      //go through arr1 an return a sorted array in array structure
      let sortedArr = arr2.map(arr => {
        let list = arr1.map((arr1Value, index) => [arr1Value, arr[index]])
        list.sort(function (a, b) {
          return ((a[1] > b[1]) ? -1 : ((a[1] === b[1]) ? 0 : 1));
        })
        return list[0]
      })

      return sortedArr
    }
  },
  mounted () {
    this.animateNumbers()
  }
}
</script>

<style scoped lang="scss">
@import "../scss/variables";

.leader-badge {
  font-size: 12px;
  font-family: Montserrat-Medium;
  position: absolute;
  top: 0;
  right: 0;
  height: auto;
  background: $color-blue;
  padding: 4px 8px;
  color: #0F0E1E;
  display: flex;
  border-radius: 0px 8px;

  .badge {
    margin: 0 8px 0 0;
  }

}
</style>
