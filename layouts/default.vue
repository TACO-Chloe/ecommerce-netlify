<template>
  <div>
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
body {
  border: 12px solid #ccc;
  min-height: 100vh;
  font-family: "Montserrat", -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, "Helvetica Neue", Arial, sans-serif;
  font-size: 16px;
  line-height: 1.4;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  z-index: 999;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

main {
  padding: 0;
  width: 95vw;
  margin-left: 0vw;
  margin-right: 0vw;
  margin-top: 0vw;
  margin-bottom: 1vw;
}

@media screen and (min-width: 1000px) {
  main {
    padding: 40px;
    width: 80vw;
    margin-left: 7vw;
	margin-right: 7vw;
	margin-top: 0vw;
	margin-bottom: 0vw;
  }
}
</style>
