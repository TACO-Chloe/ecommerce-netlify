<template>
  <transition name="slide">
    <div>
	  <app-navbar :title="'我的收貨地址'" />
	  <van-address-list
	    v-model="chosenAddressId"
	    :list="list"
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
  data() {
    return {
      chosenAddressId: '1',
      list: [
        {
          id: '1',
          name: '张三',
          tel: '13000000000',
          address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
          isDefault: true,
        },
        {
          id: '2',
          name: '李四',
          tel: '1310000000',
          address: '浙江省杭州市拱墅区莫干山路 50 号',
        },
      ],
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
    },
    onEdit(item, index) {
      Toast('编辑地址:' + index);
    },
	goBack() {
      this.$router.go(-1);
    }
  },
  components: {
	AppNavbar
  },
};
</script>

<style lang="scss" scoped>
.van-address-list {
  margin-top: 10px;
  padding-top: 46px;
}

.van-nav-bar .van-icon {
    color: #323233;
}
</style>
