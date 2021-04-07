<template>
    <div>
      <van-nav-bar :title="title"
        left-arrow
        @click-left="goBack"
        :z-index="10"
        fixed />
	</div>
</template>

<script>
  export default {
    name: "AppTabbar",
	props: {
		title: {
		  type: String,
		  default: ''
		},
	},
	methods: {
		goBack() {
		  this.$router.go(-1);
		}
	}
  };
</script>


<style lang="scss" scoped>
.van-nav-bar {
    background-color: transparent;
	margin-top: 10px;
    margin-bottom: 20px;
}

/deep/ .van-nav-bar .van-icon {
    color: #323233;
}

</style>