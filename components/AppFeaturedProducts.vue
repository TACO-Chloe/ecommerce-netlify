<template>
  <section>
    <h2>
      <span>Featured Products</span>
    </h2>
    <div class="featureditems">
      <div class="item" v-for="product in featuredProducts" :key="product.id">
        <!--<img :src="`/products/${product.img}`" />-->
		<!--<img :src="`${img.url}`"  v-for="img in product.images" />-->
		<img :src="`${img.url}`"  v-for="img in product.images.slice(0, 1)" />
        <h3>{{ product.name }}</h3>
        <h4>{{ product.price | dollar }}</h4>
        <NuxtLink :to="`/product/${product.id}`">
          <button class="multi-item">View Item ></button>
        </NuxtLink>
      </div>
    </div>
	
	<h2>
      <span>Another Products</span>
    </h2>
	
	<div id="produceItem">
		<div class="item"
			 v-for="(product,index) in featuredProducts"
			 :key="index"
			 @click.stop="goToGoodsDetail(product)">
		  <img :src="`${img.url}`"  v-for="img in product.images.slice(0, 1)" />
		  <p class="itemTitle">{{product.name}}</p>
		  <p class="itemSubTitle">{{product.spec}}</p>
		  <span class="tagEat"
				v-if="isShowEatTag">foodie</span>
		  <span class="price">
			{{product.price | dollar }}
		  </span>
		  <span class="originPrice">{{product.origin_price | dollar }}</span>
		  <div class="buyCar"
			   @click.stop="addCart(product)">

			<van-icon name="cart" color="#07c160" size="1.5rem" />
		  </div>
		</div>
	</div>
	
	<h2>
      <span>Another2 Products</span>
    </h2>
	<van-grid class="goods-list" :column-num="columnNum" :gutter="gutter" :border=true :center=true>
		<van-grid-item v-for="goods in featuredProducts" :key="goods.id" :to="'/product/'+goods.id">
		  <div class="goods-item" :style="'width:'+itemSize+'px'">
			<img :width="itemSize" v-lazy="`${img.url}`"  v-for="img in goods.images.slice(0, 1)" />
			<h4 class="card-title van-multi-ellipsis--l2">{{goods.name}}</h4>
			<div class="prodinfo">
			  <div class="price">{{coculate(goods,  percent, credit_rate)}} + {{credit(goods,  percent, credit_rate)}}<van-icon name="diamond-o"></van-icon></div>
			  <div class="buybtn">
			  <van-icon name="cart-o"></van-icon>
			  </div>
			</div>
		  </div>
		</van-grid-item>
    </van-grid>
  </section>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  props: {
    gutter: { type: Number, default: 6 },
    boxWidth: { type: Number, default: 0 },
    columnNum: { type: Number, default: 3 }
  },
  data () {
    return {
      isShowEatTag: false
    }
  },
  mounted() {
    // create a PaymentIntent on Stripe with order information
	this.$store.dispatch("getProducts");
  },
  computed: {
    featuredProducts() {
      return this.$store.getters.featuredProducts;
    },
	itemSize() {
	  const vm = this;
	  vm.fullWidth = window.innerWidth;
	  vm.fullHeight = window.innerHeight;
      let width = vm.fullWidth;
      if (width < 768) {
        return (
          (width /2.6)
		);
      }

	  console.log("this.boxWidth"+this.boxWidth);
	  console.log("this.origWidth"+this.origWidth);
	  console.log("this.columnNum"+this.columnNum);
	  console.log("this.gutter"+this.gutter);
	  console.log("vm.fullWidth"+vm.fullWidth);
	  
	  
      return 200;
    },
    credit_rate() {
      if(!this.$store.state.config){
        return 1;
      }
      if(!this.$store.state.config.credit_rate){
        return 1;
      }
      return this.$store.state.config.credit_rate
    },
    percent() {
      if(!this.$store.state.config){
        return 0;
      }
      if(!this.$store.state.config.deduction){
        return 0;
      }
      return this.$store.state.config.deduction
    }
  },
  methods: {
    ...mapMutations({
      addCart: 'ADD_TO_CART'
    }),
    // 商品详情页面
    goToGoodsDetail (goods) {
      // 跳转到商品详情页面并且传值
      this.$router.push({
        name: "goods",
        query: {
          id: goods.id,
          name: goods.name,
          small_image: goods.small_image,
          price: goods.price,
          spec: goods.spec,
          total_sales: goods.total_sales,
          origin_price: goods.origin_price,
        }
      });
    },
	coculate(goods, percent, credit_rate) {
      if(goods.credit_rate){
        credit_rate = goods.credit_rate
      }
      return goods.price - Math.round(this.credit(goods, percent, credit_rate)*100/credit_rate)*0.01
    },
    credit(goods, percent, credit_rate) {
      if(goods.credit_rate){
        credit_rate = goods.credit_rate
      }
      return Math.round(goods.price*percent*0.01*credit_rate)
    }
  }
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

h4 {
  color: #d96528;
  margin: 10px 0;
}

h2 {
  color: #d96528;
  text-align: center;
  overflow: hidden;
}
h2 span {
  display: inline-block;
  position: relative;
}
h2 span:after,
h2 span:before {
  content: " ";
  display: block;
  height: 1px;
  width: 1000px;
  background: #e6baa4;
  position: absolute;
  top: 50%;
}
h2 span:before {
  left: -1010px;
}
h2 span:after {
  right: -1010px;
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
    width: 100%;
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


#produceItem {
  width: 98%;
  height: auto;
  padding-left: 2%;
  padding-right: 2%;
  padding-top: 0.5rem;
}
.item {
  position: relative;
  display: inline-block;
  width: 48%;
  margin-right: 2%;
  margin-bottom: 0.5rem;
  background-color: white;
  border-radius: 0.3rem;
  padding-bottom: 0.6rem;
}

.item img {
  width: 100%;
  height: 100%;
  // 等比缩小图片来适应元素的尺寸
  // background-size: contain;
  // background-image: url("../../../../images/placeholderImg/product-img-load.png");
}
.item .itemTitle {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  line-height: 1rem;
  font-size: 0.625rem;
  word-break: break-all;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.item .itemSubTitle {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  color: gray;
  padding-top: 0.2rem;
  font-size: 0.45rem;
  line-height: 1rem;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  margin-bottom: 1.5rem;
}

.item .price {
  padding-left: 0.5rem;
  color: #f22222;
  font-size: 1rem;
}
.tagEat {
  margin-left: 0.5rem;
  padding: 0.09rem;
  color: orangered;
  width: 2.5rem;
  height: 0.1rem;
  border-radius: 0.2rem;
  font-size: 0.3rem;
  border: 0.05rem solid red;
}

.originPrice {
  font-size: 0.6875rem;
  color: #999999;
  text-decoration: line-through;
}
.buyCar {
  position: absolute;
  height: 1.5rem;
  width: 1.5rem;
  right: 1rem;
  bottom: 0.5rem;
}



.goods-list{
  .van-grid-item{
    .van-grid-item__content{
    padding:0;
    }
  }
}
.goods-item {
  background: #fff;
  border-radius:5px;
  overflow: hidden;

  .card-title {
    font-size: 14px;
    text-align: left;
    padding:0 5px;
    box-sizing: border-box;
    margin:5px 0;
    width: 100%;
  }
  .prodinfo{
    display:flex;
    flex-direction: row;
    line-height:32px;
    .price{
      flex:1;
      color:#b18856;
      font-size:14px;
      width:40%;
      font-weight:bold;
      white-space: nowrap;
      &:before{
        content:"￥";
        font-size:10px;
      }
      .van-icon{
        vertical-align: middle;
      }
    }
    .buybtn{
      padding-top:5px;
      padding-right:5px;
    }
  }

}

</style>
