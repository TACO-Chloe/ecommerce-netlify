<template>
  <div class="order-detail-box">
    <div class="order-status">
      <div class="status-item">
        <label>订单状态：</label>
        <span>{{  }}</span>
      </div>
      <div class="status-item">
        <label>订单编号：</label>
        <span>{{  }}</span>
      </div>
      <div class="status-item">
        <label>下单时间：</label>
        <span>{{  }}</span>
      </div>
      <!-- <van-button v-if="" style="margin-bottom: 10px" color="#1baeae" block @click="">确认订单</van-button> -->
      <van-button v-if="" style="margin-bottom: 10px" color="#1baeae" block @click="">去支付</van-button>
      <van-button v-if="" block @click="">取消订单</van-button>
    </div>
    <div class="order-price">
      <div class="price-item">
        <label>商品金额：</label>
        <span>¥ {{  }}</span>
      </div>
      <div class="price-item">
        <label>配送方式：</label>
        <span>普通快递</span>
      </div>
    </div>
    <van-card
      v-for="item in 3"
      :key="item.goodsId"
      style="background: #fff"
      :num="item.goodsCount"
      :price="item.sellingPrice"
      desc="全场包邮"
      :title="item.goodsName"
      thumb=""
    />
    <van-popup
      
      position="bottom"
      :style="{ height: '24%' }"
    >
      <div :style="{ width: '90%', margin: '0 auto', padding: '20px 0' }">
        <van-button :style="{ marginBottom: '10px' }" color="#1989fa" block @click="">支付宝支付</van-button>
        <van-button color="#4fc08d" block @click="">微信支付</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script>

export default {
  name: 'OrderDetail',
  components: {
    
  },
  
}
</script>

<style lang="scss" scoped>
  .order-detail-box {
    background: #f7f7f7;
    .order-status {
      background: #fff;
      padding: 20px;
      font-size: 15px;
      .status-item {
        margin-bottom: 10px;
        label {
          color: #999;
        }
        span {

        }
      }
    }
    .order-price {
      background: #fff;
      margin: 20px 0;
      padding: 20px;
      font-size: 15px;
      .price-item {
        margin-bottom: 10px;
        label {
          color: #999;
        }
        span {

        }
      }
    }
    .van-card {
      margin-top: 0;
    }
    .van-card__content {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
  }
</style>
