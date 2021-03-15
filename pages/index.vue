<template>
<div>
  <div>
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
  <div class="container mx-auto text-center">
    <div class="pt-4">
      <h2 class="text-xl">Nuxt with GraphCMS</h2>
      <div class="flex justify-center -mx-4 my-4">
        <router-link
          v-for="product in products"
          :to="{ name: 'product-slug', params: { id: product.id } }"
          :key="product.id"
        >
          <article class="border rounded-md p-6 mx-2">
            <h1 class="fopnt-bold text-xl">{{ product.name }}</h1>
          </article>
        </router-link>
      </div>
    </div>
  </div>
</div>  
</template>

<script>
import AppTextlockup from "~/components/AppTextlockup.vue";
import AppSalesBoxes from "~/components/AppSalesBoxes.vue";
import AppFeaturedProducts from "~/components/AppFeaturedProducts.vue";

import axios from 'axios';

export default {
  async asyncData() {
    const products = await axios.get("https://admiring-hopper-bcb70e.netlify.app/.netlify/functions/cms-gw", { useCache: true });
	  console.log(JSON.stringify(products))

    return products.data;
  },
  components: {
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

