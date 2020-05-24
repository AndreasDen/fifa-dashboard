<template>
  <div class="search-bar">
    <div class="search-bar-input">
      <input v-model="search"
             :type="type"
             :placeholder="placeholder"
             @focusout="handleFocusOut"
             @focusin="toggleFocus"
             @keydown="handleUpAndDown">
      <font-awesome-icon v-if="icon" icon="search"/>
    </div>
    <ul class="search-bar-result-list" v-if="search.trim().length > 2 && focus && filteredOptions.length >0">
      <li class="option" v-for="(option, index) in filteredOptions" :disabled=option.disabled :key="index" @click="handleClick(option.name)">
        {{option.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "search-bar",
  props: {
    options: Array,
    icon: {
      default: false,
      type: Boolean
    },
    placeholder: String,
    value: String,
    type: {
      default: 'text',
      type: String
    }
  },
  data: function () {
    return {
      search: '',
      focus: false
    }
  },
  computed: {
    filteredOptions: function () {
      return this.options.filter((option) => {
        return option.name.toLowerCase().replace('/\\s/g', '').trim().match(this.search.toLowerCase().replace('\\s', '').trim())
      })
    },
    selectedOption: function () {
      return this.filteredOptions.filter((option) => {
        return option.name.toLowerCase().replace('/\\s/g', '').trim() === this.search.toLowerCase().replace('\\s', '').trim()
      })
    }
  },
  methods: {
    handleClick: function (team) {
      this.search = team
    },
    toggleFocus: function () {
      setTimeout(function () {
        this.focus = !this.focus
      }.bind(this), 200)
    },
    handleFocusOut: function (){
      this.toggleFocus()
    },
    handleUpAndDown: function (e) {
      //TODO: Handle keyboard
      if(this.type === 'number' && e.key=== 'e') {
        return false
      }
      if (e.key === "ArrowUp") {
        // <DO YOUR WORK HERE>
      }
      if (e.key === "ArrowDown") {
        // <DO YOUR WORK HERE>
      }
      if (e.key === "Enter") {
        // <DO YOUR WORK HERE>
      }
    }
  },
  watch: {
    search: function () {
      this.$emit('chosen-item-changed', {object: this.selectedOption[0], key: this.value });
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/scss/variables";

.search-bar {
  width: 100%;
  position: relative;
}

.search-bar-input {
  position: relative;
  width: 100%;


  input {
    text-align: center;
    background: transparent;
    border-bottom: 1px dashed $color-blue;
    border-top: 0;
    border-left: 0;
    border-right: 0;
    color: #fff;
    width: 100%;
    box-sizing: border-box;
    padding: 16px;
    font-family: Montserrat-Medium;
    font-size: 12px;

    &:focus {
      outline: 0;
    }
  }

  ::placeholder {
    color: rgba(255,255,255, 0.4);
  }

  [data-icon="search"] {
    overflow: visible;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 16px;

  }
}

.search-bar-result-list {
  box-sizing: border-box;
  padding: 1px;
  width: 100%;
  position: absolute;
  top: 48px;
  list-style: none;
  margin: 0;
  background: $color-dark-blue;
  border-bottom: 1px dashed $color-blue;


  li {
    padding: 16px;
    color: #fff;
    cursor: pointer;
    position: relative;
    z-index: 1;
    text-align: center;

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
  }
}

</style>
