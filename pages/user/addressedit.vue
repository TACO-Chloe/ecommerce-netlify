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
		if (this.type == 'add') {
			let data = {
				"gltype":"createShippingAddress",
				"data": {
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
			}
			postCMS(data).then(result => {
				console.log('createShippingAddress:',result);
				
				const userInfo = this.$store.getters.gettersUserInfo;
				userInfo.shippingAddresses = userInfo.shippingAddresses.push(result.data.createShippingAddress);
				sessionStorage.setItem('userinfo', JSON.stringify(userInfo));
				this.$store.commit("setUserInfo", JSON.stringify(userInfo));
				Toast.success('Add Success~');
			})
			.catch(error => {
				console.log(error);
			});
		}
		else {
			
		}
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
		  //areaCode: "310101",
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
