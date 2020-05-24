<template>
  <div class="form">
    <section class="section section-form">
      <description>
        <h2 slot="headline">New Game</h2>
        <p slot="text" class="text">
          Just follow the steps to make a new entry
        </p>
      </description>
      <div class="form-selection">
        <fill-form-step :step-config="stepConfig">
          <div class="step-item-content" slot="step-item-content-0">
            <description>
              <h2 slot="headline">#1</h2>
              <p slot="text" class="text">
                Who was Player 1?
              </p>
            </description>
            <dropdown
                :options="this.getAllPlayersIDandNames()"
                :dropdown-index="1"
                @selected-item-changed="handleData">
            </dropdown>
          </div>
          <div class="step-item-content" slot="step-item-content-1">
            <description>
              <h2 slot="headline">#2</h2>
              <p slot="text" class="text">
                Which team was Player 1 playing?
              </p>
            </description>
            <search-bar
                :options="this.dataTeams"
                :placeholder="'Search Teams'"
                :icon="true"
                :value="'player_1_team'"
                @chosen-item-changed="handleData">
            </search-bar>
          </div>
          <div class="step-item-content" slot="step-item-content-2">
            <description>
              <h2 slot="headline">#3</h2>
              <p slot="text" class="text">
                How many goals did Player 1 score?
              </p>
            </description>
            <search-bar
                :options="this.dataTeams"
                :type="'number'"
                :placeholder="'How Many Goals?'">
            </search-bar>
          </div>
          <div class="step-item-content" slot="step-item-content-3">
            <description>
              <h2 slot="headline">#4</h2>
              <p slot="text" class="text">
                Who was Player 2?
              </p>
            </description>
            <dropdown
                :options="this.getAllPlayersIDandNames()"
                :dropdown-index="2"
                @selected-item-changed="handleData"></dropdown>
          </div>
          <div class="step-item-content" slot="step-item-content-4">
            <description>
              <h2 slot="headline">#5</h2>
              <p slot="text" class="text">
                Which team was Player 2 playing?
              </p>
            </description>
            <search-bar
                :options="this.dataTeams"
                :placeholder="'Search Teams'"
                :icon="true"
                :value="'player_2_team'"
                @chosen-item-changed="handleData">
            </search-bar>
          </div>
          <div class="step-item-content" slot="step-item-content-5">
            <description>
              <h2 slot="headline">#6</h2>
              <p slot="text" class="text">
                How many goals did Player 2 score?
              </p>
            </description>
            <search-bar
                :options="this.dataTeams"
                :type="'number'"
                :placeholder="'How Many Goals?'"></search-bar>
          </div>
        </fill-form-step>
      </div>
    </section>
  </div>
</template>

<script>
import Description from './../components/description-block'
import Dropdown from './../components/dropdown'
import FillFormStep from './../components/fill-form-step'
import SearchBar from './../components/search-bar'


export default {
  name: 'NewGameForm',
  components: {
    FillFormStep,
    Description,
    SearchBar,
    Dropdown
  },
  props: {
    dataDashboard: Array,
    dataScore: Object,
    dataComparison: Object,
    dataTeams: Array
  },
  data: function () {
    return {
      stepConfig: {
        amount: 6
      }
    }
  },
  methods: {
    getAllPlayersIDandNames: function () {
      return this.dataDashboard.map(player => {
        return {
          ...player.user,
          disabled: false,
          playerID: player.id
        };
      })
    },
    handleData: function (val) {
      console.log(val)
    }
  }
}
</script>

<style scoped lang="scss">
.form {
  height: 100%
}

section {
  padding: 16px;
  height: 100%;
}


.description-block {
  /*<!--border-bottom: 1px dashed $color-blue;-->*/
  border-right: 0;
  border-bottom: 0;
  padding: 0 0 16px 0;
  margin: 0;
}

.form-selection {
  height: 100%;
}

.fill-form-step {
  height: 100%;
  align-items: flex-start;
}

</style>
