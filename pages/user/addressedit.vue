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
import AppNavbar from "~/components/AppNavbar.vue";
import { tdist } from '@/util/util';

export default {
  components: {
	AppNavbar
  },
  data() {
	return {
		type: this.$route.query.type,
		addressId: this.$route.query.addressId,
		areaList: {
			province_list: {
				110000: '北京市',
				120000: '天津市',
			},
			city_list: {
				110100: '北京市',
				120100: '天津市',
			},
			county_list: {
				110101: '东城区',
				110102: '西城区',
				120101:	'龍華區'
				// ....
			},
		},
		addressInfo: {},
		searchResult: [],
	}
  },
  methods: {
    onDelete() {
      Toast('删除');
    },
	save() {
		Toast('保存');
	}
  },
  mounted() {
	let _province_list = {}
	let _city_list = {}
	let _county_list = {}
	tdist.getLev1().forEach(p => {
		_province_list[p.id] = p.text
		console.log('p.text',p.text)
		tdist.getLev2(p.id).forEach(c => {
		  _city_list[c.id] = c.text
		  tdist.getLev3(c.id).forEach(q => _county_list[q.id] = q.text)
		  console.log('c.text',c.text)
		})
	})
	
	this.areaList.province_list = _province_list
    this.areaList.city_list = _city_list
    this.areaList.county_list = _county_list
	


	if (this.type == 'edit') {
		const addressDetail = this.$store.getters.gettersUserInfo.shippingAddresses[this.$route.query.index]
		console.log('this.$route.query.index',this.$route.query.index)
		console.log('addressDetail',addressDetail)
		
		this.addressInfo = {
		  id: addressDetail.id,
		  name: addressDetail.name,
		  tel: addressDetail.tel,
		  province: '',
		  city: '',
		  county: addressDetail.area,
		  addressDetail: addressDetail.address,
		  areaCode: '',
		  isDefault: !!addressDetail.isDefault
		}
		
		console.log('addressInfo',this.addressInfo)

		let _areaCode = ''
		const province = tdist.getLev1()
		
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
