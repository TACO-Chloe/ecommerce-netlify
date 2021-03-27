<template>
  <van-tabbar v-model="isAct" inactive-color="#666666" active-color="#000000" fixed placeholder>
    <van-tabbar-item replace v-for="(item, index) in tabbarList" :key="index" :to="item.path">
      <span>{{ item.title }}</span>
      <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.normal" />
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  export default {
    name: "AppTabbar",
    data() {
      return {
        isAct: 0,
        tabbarList: [{
            path: "/",
            title: "HOME",
            normal: "https://sucai.suoluomei.cn/sucai_zs/images/20190910093117-fx2.png",
            active: "https://sucai.suoluomei.cn/sucai_zs/images/20190910093117-fx.png",
          },
          {
            path: "/user",
            title: "MY",
            normal: "https://sucai.suoluomei.cn/sucai_zs/images/20190910093117-wd.png",
            active: "https://sucai.suoluomei.cn/sucai_zs/images/20190910093117-wd2.png",
          },
        ],
      };
    },
    props: {
      active: {
        type: [String, Number],
        default: 0,
      }
    },

    // 对active进行监听赋值
    watch: {
      active: {
        immediate: true,
        handler(value) {
          this.isAct = parseInt(value) //String类型无效，我也母鸡呀~
        }
      }
    }
  };
</script>


<style lang="scss" scoped>

.van-tabbar-item {
  background-color: #ccc;
}

</style>