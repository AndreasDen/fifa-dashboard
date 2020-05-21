<template>
  <div class="description-block">
    <div class="copy">
        <slot name="headline"></slot>
        <slot name="text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "description-block"
}
</script>

<style scoped lang="scss">
@import "src/scss/variables";

.description-block {
  margin-bottom: 32px;
  padding-bottom: 16px;
  border-bottom: 1px dashed $color-blue;
  text-align: center;

  @media (min-width: 992px) {
    flex: 1 1 25%;
    margin-right: 16px;
    padding-right: 16px;
    border-right: 1px dashed $color-blue;
    border-bottom: 0;
    display: flex;
    align-items: center;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  @media (min-width: 1300px) {
    flex: 1 1 15%;
  }

  h2 {
    text-align: center;
    font-size: 28px;
    font-family: Sedgwick;
    color: $color-blue;
    margin: 0 0 16px 0;
    transform: rotate(-7deg);
  }

  .copy {
    width: 100%;
    margin: 0;
  }
}
</style>
