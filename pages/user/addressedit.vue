<template>
  <div class="address-edit-box">
    <app-navbar :title="`${type == 'add' ? '新增地址' : '编辑地址'}`"></app-navbar>
	<van-address-edit
      class="edit"
      :area-list="areaList"
      :address-info="addressInfo"
      :show-delete="type == 'edit'"
      show-set-default
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="save"
      @delete="onDelete"
    />

  </div>
</template>

<script>
import AppNavbar from "~/components/AppNavbar.vue";
import { tdist } from '@/util/util';

export default {
  components: {
	AppNavbar
  },
  data() {
	return {
		type: 'add',
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
	tdist.getLev2(p.id).forEach(c => {
	  _city_list[c.id] = c.text
	  tdist.getLev3(c.id).forEach(q => _county_list[q.id] = q.text)
	})
	})

	if (this.type == 'edit') {
	//const { data: addressDetail } = await getAddressDetail(addressId)
	let _areaCode = ''
	const province = tdist.getLev1()
	Object.entries(state.areaList.county_list).forEach(([id, text]) => {
	  // 先找出当前对应的区
	  if (text == addressDetail.regionName) {
		// 找到区对应的几个省份
		const provinceIndex = province.findIndex(item => item.id.substr(0, 2) == id.substr(0, 2))
		// 找到区对应的几个市区
		// eslint-disable-next-line no-unused-vars
		const cityItem = Object.entries(state.areaList.city_list).filter(([cityId, cityName]) => cityId.substr(0, 4) == id.substr(0, 4))[0]
		// 对比找到的省份和接口返回的省份是否相等，因为有一些区会重名
		if (province[provinceIndex].text == addressDetail.provinceName && cityItem[1] == addressDetail.cityName) {
		  _areaCode = id
		}
	  }
	})
	state.addressInfo = {
	  id: addressDetail.addressId,
	  name: addressDetail.userName,
	  tel: addressDetail.userPhone,
	  province: addressDetail.provinceName,
	  city: addressDetail.cityName,
	  county: addressDetail.regionName,
	  addressDetail: addressDetail.detailAddress,
	  areaCode: _areaCode,
	  isDefault: !!addressDetail.defaultFlag
	}
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
