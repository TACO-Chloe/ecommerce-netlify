<template>
  <div class="tab_home">
    <div class="tal_class_searchBox">
      <van-search placeholder="点击前往搜索"
                  @click="$router.push({ name: 'search' })" />
      <div class="tal_class_searchMask"></div>
    </div>
    <van-swipe :autoplay="3000"
               indicator-color="white">
      <van-swipe-item v-for="(banner, index) in shopInfos.banner"
                      :key="index">
        <img :src="banner.url"
             style="height:230px">
      </van-swipe-item>
    </van-swipe>

    <div class="goods-channel">
      <div class="item"
           @click="changeTabbar(channel)"
           v-for="(channel, index) in shopInfos.channel"
           :key="index">
        <img :src="channel.iconUrl"
             background-size="cover" />
        <span>{{channel.name}}</span>
      </div>
    </div>

    <van-panel title="优惠券"
               style=" padding-bottom: 10px;">
      <div class="van-coupon-item"
           v-for="(coupon,index) in shopInfos.couponList"
           :key="index"
           @click="getCoupon(coupon.id)">
        <div class="van-coupon-item__content">
          <div class="van-coupon-item__head">
            <h2>
              <span>¥</span>
              {{coupon.discount}} 元
            </h2>
            <p>{{coupon.desc }} - {{coupon.tag}}</p>
          </div>
          <div class="van-coupon-item__body">
            <h2>{{coupon.name}}</h2>
            <p>有效期：{{coupon.days}} 天</p>

          </div>
        </div>

      </div>
    </van-panel>

    <van-panel>
      <van-card :thumb-link="goDetail(grouponGood.id)"
                v-for="(grouponGood ,index) in shopInfos.grouponList"
                :key="index"
                :title="grouponGood.name"
                :desc="grouponGood.brief"
                :origin-price="grouponGood.retailPrice"
                :price="grouponGood.grouponPrice +'.00'"
                :thumb="grouponGood.picUrl"
                @native-click="goDetail(grouponGood.id)">
        <div slot="tags"
             class="card__tags">
          <van-tag plain
                   type="primary">
            {{grouponGood.grouponMember}}人成团
          </van-tag>
          <van-tag plain
                   type="danger">
            {{grouponGood.grouponDiscount}}元再减
          </van-tag>
        </div>
      </van-card>
      <div slot='header'>
        <van-cell-group>
          <van-cell title="团购专区"
                    isLink>
            <router-link to="/items/groupon"
                         class="text-desc">更多团购商品</router-link>
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel>

    <van-panel>
      <van-grid clickable
                :column-num="2">
        <van-grid-item v-for="(brand ,index) in shopInfos.brandList"
                       :key="index"
                       :text="brand.name"
                       :url="goBrand(brand.id)">
          <img :src="brand.picUrl"
               style="width: 80%;" />
          <div style="font-size:16px;"> {{ brand.name }}</div>
        </van-grid-item>
      </van-grid>
      <div slot='header'>
        <van-cell-group>
          <van-cell title="品牌商直供"
                    isLink>
            <router-link to="/items/brand-list"
                         class="text-desc">更多品牌商</router-link>
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel>

    <van-panel>
      <van-row gutter>
        <van-col span="12"
                 v-for="(newGood ,index) in shopInfos.newGoodsList"
                 :key="index">
          <router-link :to="{ path: `/items/detail/${newGood.id}`}">
            <img :src="newGood.picUrl"
                 style="width:180px;height:180px;">
          </router-link>
          <span style="padding-left: 20px;position: relative;bottom: 10px; color: rgb(123, 116, 116);white-space: nowrap;">{{newGood.name}}</span>
          <span style="padding-left: 80px;position: relative;bottom: 10px; color:#ab956d">￥ {{newGood.retailPrice}}</span>
        </van-col>
      </van-row>
      <div slot='header'>
        <van-cell-group>
          <van-cell title="新品首发"
                    isLink>
            <router-link to="/items/new"
                         class="text-desc">更多新品首发</router-link>
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel>

    <van-panel>
      <van-card :thumb-link="goDetail(groupGood.id)"
                v-for="(groupGood ,index) in shopInfos.hotGoodsList"
                :key="index"
                :title="groupGood.name"
                :desc="groupGood.brief"
                :origin-price="groupGood.counterPrice"
                :price="groupGood.retailPrice +'.00'"
                :thumb="groupGood.picUrl"
                @native-click="goDetail(groupGood.id)">
        <!-- <div slot="footer">添加日期 {{item.addTime}}</div> -->
      </van-card>
      <div slot='header'>
        <van-cell-group>
          <van-cell title="人气推荐"
                    isLink>
            <router-link to="/items/hot"
                         class="text-desc">更多人气推荐</router-link>
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel>

<van-panel>
      <van-grid clickable
                :column-num="2">
        <van-grid-item v-for="(topic ,index) in shopInfos.topicList"
                       :key="index"
                       :url="goTopic(topic.id)">
          <img :src="topic.picUrl"
               style="width: 90%; max-height: 150px;" />
          <div style="font-size:14px;color:#ab956d;"> {{ topic.title }}</div>
          <div style="font-size:10px;color:#ab956d;"> {{ topic.subtitle }}</div>
        </van-grid-item>
      </van-grid>
      <div slot='header'>
        <van-cell-group>
          <van-cell title="专题精选"
                    isLink>
            <router-link to="/items/topic-list"
                         class="text-desc">更多专题精选</router-link>
          </van-cell>
        </van-cell-group>
      </div>
    </van-panel>

  </div>
</template>

<script>
import { getHome, goodsCategory, couponReceive } from '@/api/api';
import scrollFixed from '@/mixin/scroll-fixed';
import _ from 'lodash';

import {
  List,
  Swipe,
  SwipeItem,
  Tabbar,
  TabbarItem,
  Search,
  Panel,
  CouponCell,
  CouponList,
  Toast,
  Card,
  Grid,
  GridItem,
  Row,
  Col,
  Tag
} from 'vant';

export default {
  mixins: [scrollFixed],

  data() {
    return {
      shopInfos: [],
      isLoading: false
    };
  },

  created() {
    this.initViews();
  },

  methods: {
    goDetail(id) {
      return `#/items/detail/${id}`;
    },
    goBrand(id) {
      return `#/items/brand/${id}`;
    },
    goTopic(id) {
      return `#/items/topic/${id}`;
    },    
    getCoupon(id) {
      couponReceive({ couponId: id }).then(res => {
        Toast.success('领取成功');
      });
    },
    changeTabbar(o) {
      goodsCategory({ id: o.id }).then(res => {
        let categoryId = res.data.data.currentCategory.id;
        this.$router.replace({
          name: 'category',
          query: { itemClass: categoryId }
        });
      });
    },
    initViews() {
        this.shopInfos = {"newGoodsList":[{"id":1181535,"name":"水泥","brief":"普通硅酸盐水泥，可提供发票","picUrl":"http://122.51.199.160:8080/wx/storage/fetch/owkk38ab8kp932a9k545.png","isNew":true,"isHot":true,"counterPrice":647.00,"retailPrice":679.00},{"id":1181534,"name":"111","brief":"","picUrl":"","isNew":true,"isHot":false,"counterPrice":0.00,"retailPrice":0.00},{"id":1181503,"name":"1111","brief":"","picUrl":"http://122.51.199.160:8080/wx/storage/fetch/40acqhlv7fni46b7bzbx.png","isNew":true,"isHot":false,"counterPrice":1111.00,"retailPrice":10.00},{"id":1181501,"name":"王者之品","brief":"强","picUrl":"","isNew":true,"isHot":false,"counterPrice":10000000.00,"retailPrice":0.00}],"couponList":[{"id":122,"name":"至钢水泥优惠券","desc":"八月二十号中午十二点限量发放满5000减500优惠券","tag":"水泥，优惠","discount":500.00,"min":5000.00,"days":5},{"id":120,"name":"至钢块石优惠券","desc":"八月二十号中午十二点限量发行满3000减500优惠券","tag":"块石，优惠","discount":500.00,"min":3000.00,"days":5},{"id":119,"name":"至刚钢筋优惠券","desc":"八月二十号中午十二点限量发行满10000减2000优惠券","tag":"钢筋，优惠","discount":2000.00,"min":10000.00,"days":5}],"channel":[{"id":1036275,"name":"1","iconUrl":"http://122.51.199.160:8080/wx/storage/fetch/p17j3e0x10xxxjo8u159.jpg"},{"id":1036277,"name":"汽机油","iconUrl":"http://122.51.199.160:8080/wx/storage/fetch/g9zthozwefzaqi38mf5d.png"},{"id":1036279,"name":"test","iconUrl":"http://122.51.199.160:8080/wx/storage/fetch/bica1b2qwb47s8jveas2.jpg"}],"grouponList":[],"banner":[{"id":54,"name":"碳化钢筋","link":"https://www.induschain.cn/JC530959","url":"http://122.51.199.160:8080/wx/storage/fetch/vs17fit18gn7jn618pcq.png","position":1,"content":"至刚高强度碳化钢筋","enabled":true,"addTime":"2021-07-28 18:26:05","updateTime":"2021-08-17 14:58:40","deleted":false},{"id":55,"name":"块石","link":"https://www.induschain.cn/JC209439018","url":"http://122.51.199.160:8080/wx/storage/fetch/vmg2dh6kwg8nl1ozcbh4.png","position":1,"content":"至钢精品块石，可定制","enabled":true,"addTime":"2021-07-28 18:27:53","updateTime":"2021-08-17 14:56:51","deleted":false},{"id":56,"name":"精品水泥","link":"https://www.induschain.cn/JC34803400","url":"http://122.51.199.160:8080/wx/storage/fetch/98zy9aasn0sna1w05y37.png","position":1,"content":"志刚公司精品水泥","enabled":true,"addTime":"2021-07-28 18:28:03","updateTime":"2021-08-17 14:54:52","deleted":false}],"brandList":[{"id":1046239,"name":"森马","desc":"森马","picUrl":"http://122.51.199.160:8080/wx/storage/fetch/rfj5sfirb8ynbvnvqypd.jpg","floorPrice":1.00},{"id":1046240,"name":"老大电动车","desc":"老大电动车","picUrl":"http://122.51.199.160:8080/wx/storage/fetch/vbd9lmg3ct7722uvp2ca.jpg","floorPrice":2.00}],"hotGoodsList":[{"id":1181535,"name":"水泥","brief":"普通硅酸盐水泥，可提供发票","picUrl":"http://122.51.199.160:8080/wx/storage/fetch/owkk38ab8kp932a9k545.png","isNew":true,"isHot":true,"counterPrice":647.00,"retailPrice":679.00},{"id":1181497,"name":"酒鬼花生","brief":"花生","picUrl":"","isNew":false,"isHot":true,"counterPrice":5.00,"retailPrice":0.00},{"id":1181484,"name":"士力架","brief":"士力架盒装","picUrl":"http://122.51.199.160:8080/wx/storage/fetch/25jimd5kfj4x3w8sd2nt.jpg","isNew":true,"isHot":true,"counterPrice":5.50,"retailPrice":5.00},{"id":1181480,"name":"小米HI电饭煲","brief":"1","picUrl":"","isNew":true,"isHot":true,"counterPrice":699.00,"retailPrice":0.00}],"topicList":[{"id":337,"title":"外交天团","subtitle":"耿爽","price":200.00,"readCount":"1k","picUrl":""},{"id":336,"title":"大黑熊","subtitle":"超级大一只","price":10000.00,"readCount":"1k","picUrl":""},{"id":335,"title":"333","subtitle":"eee","price":6.00,"readCount":"1k","picUrl":""}],"floorGoodsList":[{"name":"1","goodsList":[],"id":1036275},{"name":"汽机油","goodsList":[],"id":1036277},{"name":"test","goodsList":[],"id":1036279}]};
    }
  },

  components: {
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [Toast.name]: Toast,
    [CouponCell.name]: CouponCell,
    [CouponList.name]: CouponList,
    [Search.name]: Search,
    [Panel.name]: Panel,
    [List.name]: List,
    [Swipe.name]: Swipe,
    [SwipeItem.name]: SwipeItem,
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem,
    [Tag.name]: Tag,
    [Grid.name]: Grid,
    [GridItem.name]: GridItem
  }
};
</script>


<style lang="scss" scoped>
.interval_bot {
  margin-bottom: 10px;
}
.van-panel {
  margin-top: 20px;
}
.goods-channel {
  background: #fff;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding-bottom: 0px;
  padding-top: 10px;
}

.goods-channel .item {
  width: 50px;
  height: 50px;
  margin-left: 10px;
}

.goods-channel img {
  display: block;
  width: 20px;
  height: 20px;
  margin: 0 auto;
}

.goods-channel span {
  display: block;
  font-size: 14px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
  color: #333;
}
.van-coupon-cell--selected {
  color: #323233;
}
.van-coupon-list {
  height: 100%;
  position: relative;
  background-color: #f8f8f8;
}
.van-coupon-list__field {
  padding: 7px 15px;
}
.van-coupon-list__exchange {
  height: 32px;
  line-height: 30px;
}
.van-coupon-list__list {
  overflow-y: auto;
  padding: 15px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}
.van-coupon-list__close {
  left: 0;
  bottom: 0;
  position: absolute;
  font-weight: 500;
}
.van-coupon-list__empty {
  padding-top: 100px;
  text-align: center;
}
.van-coupon-list__empty p {
  color: #969799;
  margin: 15px 0;
  font-size: 14px;
  line-height: 20px;
}
.van-coupon-list__empty img {
  width: 80px;
  height: 84px;
}
.van-coupon-item {
  overflow: hidden;
  border-radius: 4px;
  margin: 0 15px 15px;
  background-color: #fff;
  -webkit-box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
}
.van-coupon-item:active {
  background-color: #e8e8e8;
}
.van-coupon-item__content {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100px;
  padding: 24px 0 0 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid red;
}
.van-coupon-item h2,
.van-coupon-item p {
  margin: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.van-coupon-item h2 {
  height: 34px;
  font-weight: 500;
  line-height: 34px;
}
.van-coupon-item p {
  font-size: 12px;
  line-height: 16px;
  color: #969799;
}
.van-coupon-item__head {
  min-width: 90px;
}
.van-coupon-item__head h2 {
  color: #f44;
  font-size: 24px;
}
.van-coupon-item__head h2 span {
  font-size: 50%;
}
.van-coupon-item__body {
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  position: relative;
  border-radius: 0 4px 4px 0;
}
.van-coupon-item__body h2 {
  font-size: 16px;
}
.van-coupon-item__corner {
  top: 16px;
  right: 15px;
  position: absolute;
}
.van-coupon-item__corner .van-icon {
  border-color: #f44;
  background-color: #f44;
}
.van-coupon-item__reason {
  padding: 7px 15px;
  border-top: 1px dashed #ebedf0;
  background-color: #fafafa;
}
.van-coupon-item--disabled:active {
  background-color: #fff;
}
.van-coupon-item--disabled .van-coupon-item__content {
  height: 90px;
}
.van-coupon-item--disabled h2,
.van-coupon-item--disabled p,
.van-coupon-item--disabled span {
  color: #969799;
}
</style>
