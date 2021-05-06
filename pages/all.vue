<template>
  <div>
    <app-store-grid :data="gettersStoreData" />
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
    ...mapGetters(["gettersStoreData"]),
  }
};
</script>

<style lang="scss" scoped>
</style>