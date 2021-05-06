<template>
  <div class="goods">
	<app-navbar :title="'商品详情'" />
    <van-swipe class="goods-swipe" :autoplay="3000">
      <van-swipe-item v-for="thumb in goods.images">
        <img :src="thumb.url" >
      </van-swipe-item>
    </van-swipe>

    <van-cell-group>
      <van-cell>
        <div class="goods-title">{{ goods.name }}</div>
        <div class="goods-price">{{ formatPrice(goods.price) }}</div>
      </van-cell>
      <van-cell class="goods-express">
        <van-col span="10">运费：{{ goods.express }}</van-col>
        <van-col span="14">剩余：{{ goods.remain }}</van-col>
      </van-cell>
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell value="进入店铺" icon="shop-o" is-link @click="sorry">
        <template #title>
          <span class="van-cell-text">有赞的店</span>
          <van-tag class="goods-tag" type="danger">官方</van-tag>
        </template>
      </van-cell>
      <van-cell title="线下门店" icon="location-o" is-link @click="sorry" />
    </van-cell-group>

    <van-cell-group class="goods-cell-group">
      <van-cell title="查看商品详情" is-link @click="sorry" />
    </van-cell-group>
	

    <van-goods-action>
      <van-goods-action-icon icon="chat-o" @click="sorry">
        客服
      </van-goods-action-icon>
      <van-goods-action-icon icon="cart-o" @click="onClickCart">
        购物车
      </van-goods-action-icon>
      <van-goods-action-button type="warning" @click="sorry">
        加入购物车
      </van-goods-action-button>
      <van-goods-action-button type="danger" @click="sorry">
        立即购买
      </van-goods-action-button>
    </van-goods-action>
  </div>
</template>

<script>
import { Toast } from 'vant';
import { mapGetters } from "vuex";
import AppNavbar from "~/components/AppNavbar.vue";

export default {
  components: {
	AppNavbar
  },

  data() {
    return {
      id: this.$route.query.id
    };
  },
  methods: {
    formatPrice() {
      return '¥' + this.goods.price;
    },
    onClickCart() {
      this.$router.push('cart');
    },
	onClickLeft () {
      this.$router.go(-1);
    },
    sorry() {
	  console.log(this.goods)
      Toast('暂无后续逻辑~');
    }
  },
  computed: {
	...mapGetters(["gettersStoreData"]),
    goods() {
      return this.gettersStoreData.find(el => el.id === this.id);
    }
  },
};
</script>

<style lang="scss">
.goods {
  padding-bottom: 50px;

  &-swipe {
    img {
      width: 100%;
      display: block;
	  margin-top: 50px;
    }
  }

  &-title {
    font-size: 16px;
  }

  &-price {
    color: #f44;
  }

  &-express {
    color: #999;
    font-size: 12px;
    padding: 5px 15px;
  }

  &-cell-group {
    margin: 15px 0;

    .van-cell__value {
      color: #999;
    }
  }

  &-tag {
    margin-left: 5px;
  }
  
  .van-goods-action {
	z-index: 99;
  }
}
</style>
