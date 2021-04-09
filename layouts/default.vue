<template>
  <div class="testgh">
    <!-- <AppSidebar /> -->
    <main>
      <nuxt />
    </main>
    <!-- <app-footer /> -->
	<app-tabbar />
  </div>
</template>

<script>
//import AppFooter from "~/components/AppFooter.vue";

import AppTabbar from "~/components/AppTabbar.vue";
//import AppSidebar from "~/components/AppSidebar.vue";

export default {
  components: {
    //AppFooter,
	AppTabbar,
    //AppSidebar
  }
};
</script>

<style scoped>

main {
  padding-right: 1rem;
  width: 100vw !important;
  margin-left: 0vw;
  margin-right: 0vw;
  margin-top: 0vw;
  margin-bottom: 1vw;
}

.testgh {
  overflow: hidden;
}

</style>
