<template>
  <div class="textlockup">
    <div class="img">
      <slot name="img">
        <img src="/world.svg" alt="shoe" />
      </slot>
    </div>
    <div class="new">
      <slot name="new">New</slot>
    </div>
    <div class="sale">
      <slot name="sale">Vegan</slot>
    </div>
    <div class="collection">
      <slot name="collection">SuBangBang</slot>
    </div>
    <div class="details">
      <slot name="details">World In Harmony</slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.textlockup {
  display: grid;
  grid-template-columns: 128px 100px 100px 1fr;
  grid-template-rows: 50px 50px 100px 20px 1fr;
  grid-column-gap: 0px;
  grid-row-gap: 3px;
  .new {
    grid-area: 1 / 2 / 5 / 5;
    font-size: 23vmin;
    color: #efefef;
    text-transform: uppercase;
  }
  .sale {
    grid-area: 2 / 3 / 3 / 5;
    font-size: 6.0vmin;
    color: #d96528;
    font-family: "PT Serif", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  .collection {
    grid-area: 3 / 4 / 4 / 5;
    font-size: 8.0vmin;
    font-family: "PT Serif", -apple-system, BlinkMacSystemFont, "Segoe UI",
      Roboto, "Helvetica Neue", Arial, sans-serif;
  }
  .details {
    grid-area: 4 / 3 / 5 / 5;
    font-size: 2vmin;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .img {
    max-width: 1250px;
    grid-area: 1 / 3 / 6 / 5;
    img {
      width: 95%;
    }
  }
}

@media screen and (max-width: 900px) {
  .textlockup {
    grid-template-columns: 10px 25px 25px 1fr !important;
    grid-template-rows: 6vmin 5.5vmin 10vmin 20px 1fr !important;
  }
}
</style>