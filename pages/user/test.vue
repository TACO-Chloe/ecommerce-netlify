<template>
<van-address-edit
  :area-list="areaList"
  show-postal
  show-delete
  show-set-default
  show-search-result
  :search-result="searchResult"
  :area-columns-placeholder="['请选择', '请选择', '请选择']"
  @save="onSave"
  @delete="onDelete"
  @change-detail="onChangeDetail"
/>
</template>


<script>
import { Toast } from 'vant';
import { areaList } from '@vant/area-data';
import '@vant/touch-emulator';

export default {
  data() {
    return {
      areaList,
      searchResult: [],
    };
  },
  methods: {
    onSave() {
      Toast('save');
	  console.log(JSON.stringify(areaList))
    },
    onDelete() {
      Toast('delete');
	  console.log(JSON.stringify(areaList))
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};


</script>