<template>
<div>
  <div>
    <app-header />
    <app-nav />
    <app-textlockup />
    <app-featured-products />
  </div>

</div>  
</template>

<script>
import AppHeader from "~/components/AppHeader.vue";
import AppNav from "~/components/AppNav.vue";
import AppTextlockup from "~/components/AppTextlockup.vue";
import AppFeaturedProducts from "~/components/AppFeaturedProducts.vue";

export default {
  components: {
    AppHeader,
    AppNav,
    AppTextlockup,
    AppFeaturedProducts
  }
};
</script>

<style>

main {
  width: 75vw;
}
</style>

