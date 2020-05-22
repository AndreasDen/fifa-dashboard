<template>
  <div class="score">
    <section class="section section-score">
      <description>
        <h2 slot="headline">Score</h2>
        <p slot="text" class="text">This overview is showing a couple of last completed games and give you the information of the end result. Furthermore you can see how man elo points a user hast won or lost.
        This list is updated after every new entry.</p>
      </description>
      <div class="result-panel-group">
        <result-panel :index="index" :game="game" v-for="(game, index) in dataScore.games" :key="index"></result-panel>
      </div>
    </section>
  </div>
</template>

<script>
import Description from './../components/description-block'
import ResultPanel from './../components/result-panel'

export default {
  name: 'Score',
  components: {
    Description,
    ResultPanel
  },
  props: {
    dataDashboard: Array,
    dataScore: Object,
    loaded: Boolean
  }
}
</script>

<style scoped lang="scss">
@import "src/scss/variables";

section {
  padding: 16px;
  max-width: 800px;
  margin: 0 auto;

  ~ section {
    margin-top: 32px;
  }
}


.description-block {
  /*<!--border-bottom: 1px dashed $color-blue;-->*/
  border-right: 0;
  padding: 0 0 16px 0;
  margin: 0;
}

</style>
