<template>
  <transition name="slide">
    <div>
	  <app-navbar :title="'我的收貨地址'" />
	  <van-address-list
	    v-model="chosenAddressId"
	    :list="shippingAddresses"
	    :disabled-list="disabledList"
	    disabled-text="以下地址超出配送范围"
	    default-tag-text="默认"
	    @add="onAdd"
	    @edit="onEdit"
	  />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { Toast } from 'vant';
import AppNavbar from "~/components/AppNavbar.vue";

export default {
  components: {
	AppNavbar
  },
  data() {
    return {
	  disabledList: [
        {
          id: '3',
          name: '王五',
          tel: '1320000000',
          address: '浙江省杭州市滨江区江南大道 15 号',
        },
      ],
    };
  },
  methods: {
    onAdd() {
      Toast('新增地址');
	  //alert(JSON.stringify(this.shippingAddresses))
	  this.$router.push({ name:'user-addressedit', query: { type: 'add'}})

    },
    onEdit(item, index) {
      Toast('编辑地址:' + index + item.id );
	  console.log(item);
	  this.$router.push({ name:'user-addressedit', query: { type: 'edit', addressId: item.id, index: index}})
    },
  },
  computed: {
    ...mapGetters(["gettersUserInfo"]),
	shippingAddresses() {
		return this.gettersUserInfo.shippingAddresses
	},
	chosenAddressId() {
		return this.gettersUserInfo.defaultAddress
	}
  },
  mounted() {
    console.log('shippingAddresses',this.gettersUserInfo)
	// for (let i = 0; i < this.shippingAddresses.length; i++){
		// var addrObj = this.shippingAddresses[i]
		// addrObj.address = addrObj.province + 
						// addrObj.city + 
						// addrObj.county +
						// addrObj.address
		//console.log('addrObj',addrObj)
	// }
  },
};
</script>

<style lang="scss" scoped>
.van-address-list {
  margin-top: 10px;
  padding-top: 46px;
}
</style>
