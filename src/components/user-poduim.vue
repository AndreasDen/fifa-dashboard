<template>
  <div class="user-podium">
      <div class="user-elo-stat" v-for="(elo, index) in this.displayNumber" :key="elo">
        <p class="user-name">{{userNames[index]}}</p>
        <p class="user-elo">{{elo}}</p>
      </div>
  </div>
</template>

<script>
export default {
  name: "user-poduim",
  props: {
    eloStats: Array,
    userNames: Array
  },
  data: function () {
    return {
      displayNumber: []
    }
  },
  watch: {
    eloStats: function(){

      //creates a array filled with 0 and same length than elo Array
      this.displayNumber = Array.from(this.eloStats, (x,i) => 0 + i)

      clearInterval(this.interval);

      this.eloStats.map((elo,index) => {

        if(elo === this.displayNumber[index]){
          return;
        }

        this.interval = window.setInterval(function(){

          if(this.displayNumber[index] !== elo){
            var change = (elo - this.displayNumber[index]) / 10;
            change = change >= 0 ? Math.ceil(change) : Math.floor(change);
            this.displayNumber[index] = this.displayNumber[index] + change;
          }

          this.$set(this.displayNumber, index, this.displayNumber[index])

        }.bind(this), 20);

      })
    }
  },
  methods: {
    animateNumber: function (nodes, start, end) {
      console.log(nodes)
      console.log(start)
      console.log(end)
      // nodes.map(node => {
      //   var interval = setInterval(function() {
      //     node.text(start);
      //     if (start >= end) clearInterval(interval);
      //     start++;
      //   }, 30);
      // })
    }
  },
  mounted () {

  }
}
</script>

<style scoped lang="scss">

</style>
