<template>
  <div class="tournament">
    <section class="section section-tournament">
      <description>
        <h2 slot="headline">Tournament</h2>
        <p slot="text" class="text">
          Here could be a tournament modus.
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
  }
}
</script>

<style scoped>

</style>
