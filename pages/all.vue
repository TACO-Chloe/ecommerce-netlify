<template>
  <div>
    <app-store-grid :data="storedata" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import AppStoreGrid from "~/components/AppStoreGrid.vue";

export default {
  components: {
    AppStoreGrid
  },
  computed: {
    //...mapState(["storedata"])
	storedata() {
	  const storeData = JSON.parse(localStorage.getItem("products"));
      return storeData;
	}
  }
};
</script>

<style lang="scss" scoped>
</style>