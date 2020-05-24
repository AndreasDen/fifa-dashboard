<template>
  <div class="fill-form-step">
    <div class="prev-step" @click="handleCounter('decrement')" :class="{'disabled': stepMin === counter}">
      <p v-html="'<'"></p>
    </div>
    <div class="step-container">
      <transition-group tag="div" name="fade">
        <div class="step-item" v-show="index === counter" :class="{'active': (index === counter)}" v-for="(steps, index) in stepConfig.amount" :key="index">
          <slot :name="'step-item-content-'+index"></slot>
        </div>
      </transition-group>
    </div>
    <div class="next-step" @click="handleCounter('increment')" :class="{'disabled': stepMax === counter}">
      <p v-html="'>'"></p>
    </div>
  </div>
</template>

<script>

export default {
  name: "fill-form-step",
  props: {
    stepConfig: Object
  },
  data: function () {
    return {
      counter: 0,
      stepMax: this.stepConfig.amount - 1,
      stepMin: 0,
      // transitionDirection: 'step-left'
    }
  },
  computed: {},
  methods: {
    handleCounter: function (mode) {
      this.counter =
          mode === 'increment' && this.counter < this.stepMax ? this.counter + 1 : //if increment and counter is not max ->  +1
              mode === 'decrement' && this.counter > this.stepMin ? this.counter - 1 :  //else if decrement and counter is not min -> -1
                  this.counter //else return current counter

      // this.transitionDirection = mode === 'increment' ? 'step-left' : 'step-right'
    }
  },
  watch: {
    counter: function (newVal) {
      return newVal
    }
  },
  mounted () {
    this.counter = 0
  }
}
</script>


<style scoped lang="scss">
.fill-form-step {
  display: flex;
  justify-content: center;
  align-items: center;

  .search-bar {
    margin: 0 auto;
  }
}

.prev-step, .next-step {
  display: flex;
  align-items: center;
  opacity: 1;
  transition: opacity .35s ease;
  font-size: 48px;
  padding: 8px 8px;
  font-family: Sedgwick;
  cursor: pointer;

  @media (min-width: 768px) {
    padding: 8px 16px;
  }

  &.disabled {
    opacity: 0;
  }
}

.prev-step {
  p {
    margin-left: auto;
  }
}

.step-container {
  max-width: 400px;
  width: 100%;

  > div {
    position: relative;
    overflow: visible;
    /*display: flex;*/
    /*overflow-x: hidden;*/
    width: 100%;
    /*height: 100%;*/
    /*min-height: 50px;*/
  }

  .step-item {
    /*position: absolute;*/
    min-width: 100%;
    flex: 1 1 100%;
    padding: 16px 0 0 0;
    box-sizing: border-box;
    background: rgba(26, 25, 49, 1);
    border-radius: 4px;
  }



}

.fade-enter-active {
  transition: all 0.25s ease .25s;
}

.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-leave ,.fade-leave-active{
  position: absolute; //TODO: do not understand why this is necessary, maybe check in the future...
  top: 0;
}

.fade-enter,
.fade-leave-active,
{
  opacity: 0;
}

//This wasn`t working out with, because i coudn`t manage overflow visible problematic from absolute positioned items within
/*.step-left-enter {
  transform: translateX(100%);
}

.step-left-enter-to {
  transform: translateX(0);
}

.step-left-leave {
  transform: translateX(0);
}

.step-left-leave-to {
  transform: translateX(-100%);
}


.step-right-enter {
  transform: translateX(-100%);
}

.step-right-enter-to {
  transform: translateX(0);
}

.step-right-leave {
  transform: translateX(0);
}

.step-right-leave-to {
  transform: translateX(100%);
}


.step-left-leave-active {
  transition: all .35s;
}

.step-right-leave-active {
  transition: all .35s;
}

.step-right-enter-active {
  transition: all .35s .35s;
}

.step-left-enter-active {
  transition: all .35s .35s;
}*/

</style>
