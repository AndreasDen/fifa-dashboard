<template>
  <div class="form">
    <description>
      <h2 slot="headline">New Game</h2>
      <p slot="text" class="text">
        Just follow the steps to make a new entry
      </p>
    </description>
    <section class="section section-result">
      <result-panel :game="game" :tooltip="false"></result-panel>
    </section>
    <section class="section section-form">
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
                :clear="clear"
                :options="this.getAllPlayersIDandNames()"
                :dropdown-index="1"
                :value="'player_1_name'"
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
                :clear="clear"
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
                :clear="clear"
                :options="this.dataTeams"
                :type="'number'"
                :value="'player_1_goals'"
                :placeholder="'How Many Goals?'"
                @chosen-item-changed="handleData">
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
                :clear="clear"
                :options="this.getAllPlayersIDandNames()"
                :dropdown-index="2"
                :value="'player_2_name'"
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
                :clear="clear"
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
                :clear="clear"
                :options="this.dataTeams"
                :type="'number'"
                :value="'player_2_goals'"
                :placeholder="'How Many Goals?'"
                @chosen-item-changed="handleData"
            ></search-bar>
          </div>
        </fill-form-step>
      </div>
    </section>
    <section class="section section-submit">
      <button type="submit" @click.prevent="submit" v-if="dataComplete">
        Submit New Game
      </button>
    </section>
  </div>
</template>

<script>
import Description from './../components/description-block'
import Dropdown from './../components/dropdown'
import FillFormStep from './../components/fill-form-step'
import SearchBar from './../components/search-bar'
import ResultPanel from './../components/result-panel'


export default {
  name: 'NewGameForm',
  components: {
    FillFormStep,
    Description,
    SearchBar,
    Dropdown,
    ResultPanel
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
      },
      dataObject: {
        home_player_id: null,
        home_team_id: null,
        home_goals_end: null,
        home_goals_regular: null,
        with_penalty: false, //TODO: build options to seperate regular goals and penalties
        away_player_id: null,
        away_goals_end: null,
        away_goals_regular: null,
        away_team_id: null
      },
      game: {
        away_goals_end: '-',
        away_wandered_elo: 0,
        away_player: {
          user: {
            id: "player_1",
            name: "Player 1"
          }
        },
        away_team: {
          name: "Team 1"
        },
        home_goals_end: '-',
        home_wandered_elo: 0,
        home_player: {
          user: {
            id: "player_2",
            name: "Player 2"
          }
        },
        home_team: {
          name: "Team 2"
        }
      },
      clear: false
    }
  },
  computed: {
    dataComplete: function () {
      return Object.values(this.dataObject).every(x => {
        return (x !== null && x !== '')
      })
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
      switch (val.key) {
        case ('player_1_name'):
          this.dataObject.home_player_id = val.item.playerID
          this.game.home_player.user.name = val.item.playerName
          break;
        case ('player_2_name'):
          this.dataObject.away_player_id = val.item.playerID
          this.game.away_player.user.name = val.item.playerName
          break;
        case ('player_1_team'):
          if (val.item !== undefined) {
            this.dataObject.home_team_id = val.item.id
            this.game.home_team.name = val.item.name
          } else {
            this.dataObject.home_team_id = null
            this.game.home_team.name = '-'
          }
          break;
        case ('player_2_team'):
          if (val.item !== undefined) {
            this.dataObject.away_team_id = val.item.id
            this.game.away_team.name = val.item.name
          } else {
            this.dataObject.away_team_id = null
            this.game.away_team.name = '-'
          }
          break;
        case ('player_1_goals'):
          this.dataObject.home_goals_end = val.item
          this.dataObject.home_goals_regular = val.item
          this.game.home_goals_end = val.item
          break;
        case ('player_2_goals'):
          this.dataObject.away_goals_end = val.item
          this.dataObject.away_goals_regular = val.item
          this.game.away_goals_end = val.item
          break;
      }
    },
    clearData: function () {
      this.clear = true
      setTimeout(function () {
        this.clear = false
      }.bind(this), 100)
    },
    submit: function () {
      const serverPrefix = window.btoa('trvmp-prod');
      const serverPathPushGame = window.btoa('games');

      this.$axios.post('https://' + window.atob(serverPrefix) + '.herokuapp.com/' + window.atob(serverPathPushGame), this.dataObject)
          .then(res => {
            this.clearData();
            this.$emit('new-game-was-pushed', true)
            //TODO: give user some sign that games was pushed
            console.log("success", res)
          })
          .catch(err => {
            //TODO: do something on failure
            console.log("error", err)
          });
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/scss/variables";

.form {
  height: 100%;
  padding: 16px;
}

.section-result {
  .result-panel {
    padding-bottom: 16px;
    max-width: 400px;
    margin: 0 auto;
  }
}

.section-submit {
  button {
    max-width: 400px;
    margin: 0 auto;
    display: block;
    background: $color-blue;
    border: 1px dashed $color-blue;
    border-radius: 4px;
    height: 40px;
    width: 100%;
    cursor: pointer;
    transition: all .25s ease;

    &:hover {
      background: $color-blue-transparent-8;
    }
    &:active {
      background: $color-blue-transparent-4;
    }
    &:focus,
    &:active {
      outline: 0;
    }
  }
}

section {
  padding: 16px;
}

.description-block {
  border-right: 0;
  border-bottom: 0;
  padding: 0 0 16px 0;
  margin: 0;
}

.form-selection {
  height: 100%;
}

</style>
