<template lang="html">
  <div class="">
    <!-- 轮播模块 -->
	<van-row>
	<van-col offset="2" span="19">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, idx) in 3" :key="idx">
        <img
          :src="require(`@/assets/bg${item}.png`)"
          width="100%"
          class="swipe-img"
        />
      </van-swipe-item>
    </van-swipe>
	</van-col>
	</van-row>
    <!-- 按钮组 -->
    <ul flex="box:mean" class="ul-btn-wrapper">
      <li flex="box:mean">
        <van-button type="primary">发<i />货</van-button>
      </li>
      <li flex="box:mean">
        <van-button type="danger" @click="$router.push('/inquiry')"
          >询<i />价</van-button
        >
      </li>
    </ul>
	
	<van-swipe class="my-swipe" :autoplay="6000">
	  <van-swipe-item v-for="(image, index) in images" :key="index">
		<van-image fit="cover" :src="image" width="80%" height="200px" />
	  </van-swipe-item>
   </van-swipe>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  mixins: [],
  props: {},
  data() {
    return {
	  images: [
        'https://img01.yzcdn.cn/vant/apple-1.jpg',
        'https://img01.yzcdn.cn/vant/apple-2.jpg',
      ],
	}
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang="scss" scoped>


.swipe-img {
  height: 150px;
  float: left;
}
.ul-btn-wrapper {
  margin-top: 40px;
  li {
    padding: 0 16px;
    font-size: 20px;
    i {
      padding: 0 4px;
    }
  }
}



.my-swipe .van-swipe-item {
	height: 200px;
	width: 100px;

}

</style>