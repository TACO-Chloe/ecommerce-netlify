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
  <!--<div class="container mx-auto text-center">
    <div class="pt-4">
      <h2 class="text-xl">Nuxt with GraphCMS</h2>
      <div class="flex justify-center -mx-4 my-4">
        <router-link
          v-for="product in products"
          :to="{ name: 'product-slug', params: { slug: product.id } }"
          :key="product.id"
        >
          <article class="border rounded-md p-6 mx-2">
            <h1 class="fopnt-bold text-xl">{{ product.name }}</h1>
          </article>
        </router-link>
      </div>
    </div>
  </div>-->
  
      <div class="goods">
      <van-swipe class="goods-swipe" :autoplay="3000">
        <van-swipe-item v-for="thumb in goods.thumb" :key="thumb">
          <img :src="thumb" >
        </van-swipe-item>
      </van-swipe>

      <van-cell-group>
        <van-cell>
          <div class="goods-title">{{ goods.title }}</div>
          <div class="goods-price">{{ formatPrice(goods.price) }}</div>
        </van-cell>
        <van-cell class="goods-express">
          <van-col span="10">运费：{{ goods.express }}</van-col>
          <van-col span="14">剩余：{{ goods.remain }}</van-col>
        </van-cell>
      </van-cell-group>
  
      <van-cell-group class="goods-cell-group">
        <van-cell value="进入店铺" icon="shop-o" is-link @click="enterShop">
          <template slot="title">
            <span class="van-cell-text">有赞的店</span>
            <van-tag class="goods-tag" type="danger">官方</van-tag>
          </template>
        </van-cell>
        <van-cell title="查看商品详情" is-link @click="showGoodsDetail" />
      </van-cell-group>

      <van-goods-action>
        <van-goods-action-icon icon="chat-o" @click="showChat">
          客服
        </van-goods-action-icon>
        <van-goods-action-icon icon="cart-o" @click="showCart">
          购物车
        </van-goods-action-icon>
        <van-goods-action-button type="warning" @click="addCart">
          加入购物车
        </van-goods-action-button>
        <van-goods-action-button type="danger" @click="buy">
          立即购买
        </van-goods-action-button>
      </van-goods-action>
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
    const products = await axios.get("https://subangbang.netlify.app/.netlify/functions/cms-gw", { useCache: true });
    console.log(JSON.stringify(products));
    window.navigator.vibrate(200);
    window.navigator.vibrate([100,30,100,30,100,30,200,30,200,30,200,30,100,30,100,30,100]); // Vibrate 'SOS' in Morse.
    return products.data;
  },
  data() {
        return {
          goods: {
            title: '美国伽力果（约680g/3个）',
            price: 2680,
            express: '免运费',
            remain: 19,
            thumb: [
              'https://img.yzcdn.cn/public_files/2017/10/24/e5a5a02309a41f9f5def56684808d9ae.jpeg',
              'https://img.yzcdn.cn/public_files/2017/10/24/1791ba14088f9c2be8c610d0a6cc0f93.jpeg'
            ]
          }
        };
      },

      methods: {
        formatPrice() {
          return '¥' + (this.goods.price / 100).toFixed(2);
        },

        enterShop() {
          vant.Toast('进入店铺');
        },

        showGoodsDetail() {
          vant.Toast('查看商品详情');
        },

        showChat() {
          vant.Toast('进入客服页面');
        },

        showCart() {
          vant.Toast('进入购物车页面');
        },

        addCart() {
          vant.Toast('加入购物车');
        },

        buy() {
          vant.Toast('立即购买');
        }
  },
  components: {
    AppTextlockup,
    AppSalesBoxes,
    AppFeaturedProducts
  }
};

var options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

function success(pos) {
  var crd = pos.coords;

  console.log('Your current position is:');
  console.log('Latitude : ' + crd.latitude);
  console.log('Longitude: ' + crd.longitude);
  console.log('More or less ' + crd.accuracy + ' meters.');
};

function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};

navigator.geolocation.getCurrentPosition(success, error, options);
</script>

<style>
.test {
  margin: 3vh;
}

main {
  width: 75vw;
}
</style>

