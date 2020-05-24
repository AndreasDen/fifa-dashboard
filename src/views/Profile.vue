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
  }
}
</script>

<style scoped>

</style>
