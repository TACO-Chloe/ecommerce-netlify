<template>
  <div class="">
	<van-search
	  v-model="value"
	  shape="round"
	  placeholder="搜索"
	  input-align="center"
	  @search="onSearch"
	  @cancel="onCancel"
	/>
  </div>
</template>

<script>
import { Toast } from 'vant';

export default {
  data() {
    return {
      value: '',
    };
  },
  methods: {
    onSearch(val) {
      Toast(val);
    },
    onCancel() {
      Toast('取消');
    },
  },
}
</script>

<style lang="scss" scoped>


.van-search--show-action {
    padding-right: 20px;
}

.van-search {
    background-color: #ccc; 
	margin: -1px;
}

@media screen and (min-width: 540px) {
	.van-search {
		background-color: transparent; 
		margin-right: 10px;
		padding-top: 20px;
	}
}

</style>
