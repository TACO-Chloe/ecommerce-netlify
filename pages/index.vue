<template>
<div>
  <div>
    <app-header />
    <app-nav />
    <app-textlockup />
    <app-sales-boxes />
    <app-textlockup>
      <template v-slot:img>
        <img src="/bag.jpg" alt="bag" />
      </template>
      <template v-slot:new>50%</template>
      <template v-slot:sale>Storewide Sale</template>
      <template v-slot:collection>Summer</template>
      <template v-slot:details>All accessories</template>
    </app-textlockup>
    <app-featured-products />
  </div>

</div>  
</template>

<script>
import AppHeader from "~/components/AppHeader.vue";
import AppNav from "~/components/AppNav.vue";
import AppTextlockup from "~/components/AppTextlockup.vue";
import AppSalesBoxes from "~/components/AppSalesBoxes.vue";
import AppFeaturedProducts from "~/components/AppFeaturedProducts.vue";

import axios from 'axios';

export default {
  //async asyncData() {
    //const products = await axios.get("https://subangbang.netlify.app/.netlify/functions/cms-gw", { useCache: true });
	//console.log(JSON.stringify(products));
	//window.navigator.vibrate(200);
    //return products.data;
  //},
  //mounted() {
    // create a PaymentIntent on Stripe with order information
	//this.$store.dispatch("getProducts");
  //},
  components: {
    AppHeader,
    AppNav,
    AppTextlockup,
    AppSalesBoxes,
    AppFeaturedProducts
  }
};
</script>

<style>
.test {
  margin: 3vh;
}

main {
  width: 75vw;
}
</style>

