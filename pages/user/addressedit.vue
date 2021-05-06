<template>
  <div class="address-edit-box">
    <app-navbar :title="`${type == 'add' ? '新增地址' : '编辑地址'}`"></app-navbar>
	<van-address-edit
      class="edit"
      :area-list="areaList"
      :address-info="addressInfo"
      :show-delete="type == 'edit'"
      :show-set-default="type == 'edit'"
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="save"
      @delete="onDelete"
    />

  </div>
</template>

<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import { postCMS } from '@/api/api';
import '@vant/touch-emulator';
import AppNavbar from "~/components/AppNavbar.vue";

export default {
  components: {
	AppNavbar
  },
  data() {
	return {
		type: this.$route.query.type,
		addressId: this.$route.query.addressId,
		areaList,
		addressInfo: {},
		searchResult: [],
	}
  },
  methods: {
    onDelete() {
      Toast('删除');
    },
	save(content) {
		console.log('content',content)
		
		let address = {
			"address": content.addressDetail,
			"areaCode": content.areaCode,
			"city": content.city,
			"area": content.county,
			"receiver": content.name,
			"province": content.province,
			"phone": content.tel,
			"suUser": {
			  "connect": {
				  "userid": this.$store.getters.gettersUserInfo.userid
			  }
			}
		}
		
		if (this.type == 'add') {
			var gltype = "createShippingAddress"
			var data = {
				"gltype": gltype,
				"data": address
			}
			var execStr = 'userInfo.shippingAddresses.push(result.data[gltype])'
		}
		else {
			var gltype = "updateShippingAddress"
			var data = {
				"gltype": gltype,
				"id": this.addressId,
				"data": address
			}
			var indexSA = this.$route.query.index
			var execStr = 'userInfo.shippingAddresses[indexSA] = result.data[gltype]'
		}
		postCMS(data).then(result => {
			console.log(`${this.type}ShippingAddress:`,result.data);
			const userInfo = this.$store.getters.gettersUserInfo;
			eval(execStr)
			this.$store.commit("setUserInfo", userInfo);
			console.log('userInfo',userInfo);
			Toast.success('Success~');
		})
		.catch(error => {
			console.log(error);
		});
		Toast('保存');
	}
  },
  mounted() {
	if (this.type == 'edit') {
		const addressDetail = this.$store.getters.gettersUserInfo.shippingAddresses[this.$route.query.index]
		console.log('this.$route.query.index',this.$route.query.index)
		console.log('addressDetail',addressDetail)
		
		this.addressInfo = {
		  id: addressDetail.id,
		  name: addressDetail.name,
		  tel: addressDetail.tel,
		  province: addressDetail.province,
		  city: addressDetail.city,
		  county: addressDetail.county,
		  addressDetail: addressDetail.address,
		  areaCode: addressDetail.areaCode,
		  isDefault: !!addressDetail.isDefault
		}
		
		console.log('addressInfo',this.addressInfo)
	}
  }
}
</script>

<style lang="scss">
  
  .edit {
    .van-field__body {
      textarea {
        height: 26px!important;
      }
    }
  }
  .address-edit-box {
	margin-top: 50px;
    .van-address-edit {
      .van-button--danger {

      }
      .van-switch--on {

      }
    }
  }
</style>
