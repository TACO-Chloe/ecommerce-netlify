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
	  <p>
		<div class="featureditems">
			<img class="item" :src="image.url"  v-for="image in product.images"  />
		</div>
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


<style lang="scss" scoped>
section {
  margin-top: 60px;
}

.featureditems {
  width: 100%;
  margin: 20px 0 70px;
  .item {
    border: 1px solid #eee2dc;
    box-shadow: 0 3px 10px 0px #eee;
    border-radius: 40px;
    padding: 10px 20px 30px;
    min-height: 150px;
    justify-self: center;
    align-self: center;
    text-align: center;
  }
}

@media screen and (max-width: 699px) {
  .featureditems {
    width: 83vw;
    margin-left: 5vw;
    div {
      padding: 10px 20px;
      margin-bottom: 10px;
    }
  }

  img {
    width: 50%;
	height: 50%;
  }
}

@media screen and (min-width: 700px) {
  .featureditems {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr;
    grid-column-gap: 20px;
    grid-row-gap: 0px;
    div {
      padding: 40px 50px;
    }
  }

  img {
    width: 100%;
  }
}
</style>

