<template>
  <div class="profile">
    <section class="section section-tournament">
      <description>
        <h2 slot="headline">Profil</h2>
        <p slot="text" class="text">
          Here could be a profil an player only statistics.
        </p>
      </description>
    </section>
  </div>
</template>

<script>
import Description from './../components/description-block'

export default {
  name: 'PlayerComparison',
  components: {
    Description
  },
  props: {
    dataDashboard: Array,
    dataScore: Object,
    dataComparison: Object,
    dataTeams: Array
  }
}
</script>

<style scoped lang="scss">
.description-block {
  border: 0;
  padding: 16px;
}
</style>
