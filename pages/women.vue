<template>
  <div>
    <app-store-grid :data="tshirts" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppStoreGrid from "~/components/AppStoreGrid.vue";

export default {
  components: {
    AppStoreGrid
  },
  computed: {
    ...mapGetters(["tshirts"])
  }
};
</script>

<style lang="scss" scoped>
</style>