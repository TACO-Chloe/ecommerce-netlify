<template>
  <div>
    <app-store-grid :data="accessories" />
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
    ...mapGetters(["accessories"])
  }
};
</script>

<style lang="scss" scoped>
</style>