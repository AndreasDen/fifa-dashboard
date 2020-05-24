<template>
  <div class="dropdown-custom" @click="optionsVisible = !optionsVisible" :class="{'dropdown-open':optionsVisible, 'animation-start':animationStart}">
    <p class="selected">{{selected.name}}</p>
    <transition name="fade">
      <ul class="options-list" v-if="optionsVisible">
        <li class="option" v-for="(option, index) in options" :disabled=option.disabled :key="index" @click="selectOption(option)">
          {{option.name}}
        </li>
      </ul>
    </transition>
  </div>
</template>

<script>
export default {
  name: "dropdown",
  props: {
    options: Array,
    dropdownIndex: Number,
    value: String,
    clear: Boolean
  },
  data () {
    return {
      selected: {
        name: 'Player-' + this.dropdownIndex
      },
      optionsVisible: false,
      animationStart: false,
    }
  },
  watch: {
    optionsVisible: function (val) {
      setTimeout(() => {
        this.animationStart = val
      }, 250)
    },
    clear: function (val) {
      val ? this.selected.name = 'Player-' + this.dropdownIndex : false
    }
  },
  methods: {
    selectOption: function (option) {
      this.selected = option
      this.$emit('selected-item-changed',
          {
            key: this.value,
            item: {dropdownIndex: this.dropdownIndex, playerID: this.selected.playerID, playerName: this.selected.name
            }});

    },
  },
}
</script>

<style scoped lang="scss">
@import "src/scss/variables";
@import "src/scss/animations";

.dropdown-custom {
  width: 100%;
  position: relative;
  border-bottom: 1px dashed $color-blue;

  .selected {
    cursor: pointer;
    text-align: center;
    margin: 0;
    padding: 16px 0;
    font-family: Montserrat-Medium;
  }

  &:after {
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;
    content: "";
    border-radius: 2px;
    width: 10px;
    height: 10px;
    background: $color-blue;
    animation: 2s pulse-box-shadow infinite;
    transition: all .25s ease;
  }

  &.dropdown-open {
    &.animation-start {
      &:after {
        top: 48px;
        transform: translateY(-50%) rotate(45deg);
      }

      ul {
        li {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
  }


  ul {
    position: absolute;
    top: 36px;
    left: 0;
    padding: 0;
    list-style: none;
    text-align: center;
    /*<!--border-bottom: 1px dashed $color-blue;-->*/
    background: $color-medium-blue;
    border-radius: 4px;
    z-index: 1;
    width: 100%;

    &:before {
      width: 10px;
      height: 10px;
    }

    li {
      padding: 16px;
      position: relative;
      cursor: pointer;
      transform: translateX(-10px);
      opacity: 0;
      transition: all .25s ease;
      font-family: Montserrat-Medium;

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
      }

      &:hover {
        &:after {
          background: $color-blue;
          opacity: 1;
          transition: all 0s ease;
        }
      }

      &[disabled="disabled"] {
        cursor: default;
        pointer-events: none;

        &:before {
          position: absolute;
          content: "";
          transform: translateX(-50%);
          left: 50%;
          top: 50%;
          width: 40px;
          height: 1px;
          border-bottom: 1px solid $color-blue;
        }

        &:after {
          background: $color-blue-transparent-0;
        }
      }
    }

    @for $i from 1 to 20 {
      li:nth-child(#{$i}) {
        transition-delay: $i * 0.1s;
      }
    }
  }
}

.fade-enter-active {
  transition: all 0.25s ease;
}

.fade-leave-active {
  transition: all 0.25s ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>
