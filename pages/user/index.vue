<template>
  <div>
    <img class="user-poster" src="/great.png">
    <van-row class="user-links">
      <van-col span="6">
        <van-icon name="pending-payment" />
        待付款
      </van-col>
      <van-col span="6">
        <van-icon name="tosend" />
        待发货
      </van-col>
      <van-col span="6">
        <van-icon name="logistics" />
        待收货
      </van-col>
	  <van-col span="6">
        <van-icon name="comment-o" />
        待評價
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="records" title="全部订单" is-link />
    </van-cell-group>

    <van-cell-group>
	  <van-cell icon="location-o" title="我的地址" is-link to="/user/address" />
      <van-cell icon="contact" title="我的信息" is-link to="/user/setting"/>
      <van-cell icon="gold-coin-o" title="我的优惠券" is-link />
      <van-cell icon="gift-o" title="我收到的礼物" is-link />
    </van-cell-group>
  </div>
</template>

<script>
import { Row, Col, Icon, Cell, CellGroup, Toast } from 'vant';
import { postCMS } from '@/api/api';
import { DeviceUUID } from '@/util/device-uuid'

export default {
  async asyncData({store}) {
	let uuid = new DeviceUUID().get();
	console.log('deviceUUID',uuid)
	let data = {"gltype":"getSuUser","userid": uuid}
	
	await postCMS(data).then(result => {
	  console.log('getSuUserResult:',result);
	  if (result.data.suUser) {
	  
		  var shippingAddresses = result.data.suUser.shippingAddresses
		  for (let i = 0; i < shippingAddresses.length; i++){
			if (shippingAddresses[i].id === result.data.suUser.defaultAddress)
			{
				result.data.suUser.shippingAddresses[i].isDefault = true;
			}
		  }
		  
		  store.commit("setUserInfo", result.data.suUser);
		  console.log('gettersUserInfo',store.getters.gettersUserInfo);
		  Toast.success('Query Success~');
	  }
	  else {
		let data = {"gltype":"createSuUser","data":{"userid": uuid}}
		postCMS(data).then(result => {
			console.log('createSuUserResult:',result);
			store.commit("setUserInfo", result.data.createSuUser);
			Toast.success('Add Success~');
		})
		.catch(error => {
			console.log(error);
		});
	  }
	})
	.catch(error => {
	  console.log(error);
	});
	
  },
  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
};
</script>

<style lang="scss">
.user {
  &-poster {
    width: 100%;
    height: 38vw;
	display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
  }

  &-group {
    margin-bottom: 15px;
  }

  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;

    .van-icon {
      display: block;
      font-size: 24px;
    }
  }
}
</style>
