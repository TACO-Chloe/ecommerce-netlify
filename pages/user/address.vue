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
import { Toast } from 'vant';
import AppNavbar from "~/components/AppNavbar.vue";

export default {
  components: {
	AppNavbar
  },
  data() {
    return {
	  shippingAddresses: this.$store.getters.gettersUserInfo.shippingAddresses,
      chosenAddressId: this.$store.getters.gettersUserInfo.defaultAddress,
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
};
</script>

<style lang="scss" scoped>
.van-address-list {
  margin-top: 10px;
  padding-top: 46px;
}
</style>
