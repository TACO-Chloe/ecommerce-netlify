<template>
  <div class="container mx-auto" v-if="product">
    <div>
      <h1 class="font-bold text-xl">{{ product.name }}</h1>
      <p class="text-lg">{{ product.description }}</p>
      <p>
        {{
          new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
          }).format(product.price / 100)
        }}
      </p>
    </div>
  </div>
</template>

<script>
// import { gql } from 'graphql-request';
import axios from 'axios';

export default {
  async asyncData({params}) {
  
    const { slug } = params;
    //const products = await axios.post("https://admiring-hopper-bcb70e.netlify.app/.netlify/functions/test", {'id':'ckdu44mn40gxh010405uwgbtw'}, { useCache: true });
	const products = await axios.post("https://admiring-hopper-bcb70e.netlify.app/.netlify/functions/cms-gw", {'id':slug}, { useCache: true });
	console.log(products)


	console.log("params:"+ JSON.stringify(params));
	console.log("id:"+ slug );
	//console.log("products:"+ JSON.stringify(products));
    return products.data;
  },
  head() {
    return {
      title: this.product.name,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.product.description,
        },
      ],
    };
  },
};
</script>
