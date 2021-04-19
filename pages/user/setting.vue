<template>
  <div class="seting-box">
    <app-navbar :title="'我的消息'" />
	<van-cell-group style="margin-top:3rem">
		<div class="div-cell">
			<app-uploader :img="snapshot.url" />
		</div>
    </van-cell-group>

	
    <div class="input-item">
      <van-field v-model="nickName" label="昵称" />
	  <div class="van-cell van-field">
		  <div class="van-cell__title van-field__label">
			<span>性別</span>
		  </div>
		  <van-radio-group v-model="gender" direction="horizontal">
			  <van-radio name="M">男</van-radio>
			  <van-radio name="F">女</van-radio>
		  </van-radio-group>
	  </div>
	  <div class="van-cell van-field" @click="datePicker">
		  <div class="van-cell__title van-field__label">
			<span>生日</span>
		  </div>
		  <div class="van-field__body">{{birth}}</div>
	  </div>
	  <van-popup v-model="showdate"  position="bottom">
		  <van-datetime-picker
			  v-model="currentDate"
			  type="date"
			  :min-date="minDate"
			  :max-date="maxDate"
			  @cancel="cancelPicker" 
			  @confirm="confirmPicker"
		  />
	  </van-popup>
	  <div class="van-cell van-field" @click="onKeyboard">
		  <div class="van-cell__title van-field__label">
			<span>電話</span>
		  </div> 
		  <div class="van-field__body" v-if="win"><input type="text" v-model="mobile" class="van-field__control"></div>
		  <div class="van-field__body" v-else>{{mobile}}</div>
	  </div>

	  <van-number-keyboard
		  :show="show"
		  theme="custom"
		  close-button-text="完成"
		  @blur="show = false"
		  @input="onInput"
		  @delete="onDelete"
	  />
	  <van-field v-model="introduceSign" label="个性签名" />
    </div>
    <van-button round class="save-btn"  type="primary" @click="save" block>保存</van-button>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations  } from 'vuex'
import AppNavbar from "~/components/AppNavbar.vue";
import AppUploader from "~/components/AppUploader.vue";
import { Toast } from 'vant'
import { postCMS } from '@/api/api';
import axios from 'axios';

export default {
  async asyncData() {
	let data = '{"gltype":"getSuUser","userid": "A1234567890"}'
	
	await postCMS(data).then(result => {
	  console.log('Result:',result);
	  sessionStorage.setItem('userinfo', JSON.stringify(result.data.suUser));
	  Toast.success('Query Success~');
	})
	.catch(error => {
	  console.log(error);
	});
  },
  components: {
    AppNavbar,
	AppUploader
  },
  data() {
    return {
	  nickName: this.$store.getters.gettersUserInfo.name,
	  snapshot: this.getSnapshot(),
      gender: this.$store.getters.gettersUserInfo.gender,
	  birth: this.$store.getters.gettersUserInfo.birth,
	  mobile: this.$store.getters.gettersUserInfo.mobile,
	  introduceSign: this.$store.getters.gettersUserInfo.motto,
	  show: false,
	  showdate: false,
	  win: false,
	  minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
	  currentDate: new Date(new Date().getFullYear() -20 , 0, 1),
    };
  },
  methods: {
    onInput(value) {
      Toast(value);
	  this.mobile = this.mobile.concat(value);
    },
    onDelete() {
      Toast('删除');
	  this.mobile = this.mobile.slice(0,this.mobile.length - 1);
    },
	save() {
		Toast('保存');
		console.log(this.snapshot);
		if (localStorage.getItem("token") === null && process.browser) {
		localStorage.setItem('token','7533967');
		alert('set_token');
		}
		//var data = JSON.parse('{"userid": "A1234567895","snapshot": {"connect": {"id": "cknftykhc7qk00a89qzoqh9bs"}}}');
		//const userInfo = axios.post("https://subangbang.netlify.app/.netlify/functions/cms-gw", {'gltype':'createSuUser','data':data}, { useCache: true });
		
		//${sessionStorage.getItem('connectID')}
		
		var data = `{
			"gltype":"upsertSuUser",
			"userid": "A1234567890",
			"name": "${this.nickName}",
			"snapshotid": "${sessionStorage.getItem('connectID')}", 
			"gender": "${this.gender}",
			"birth": "${this.birth}",
			"mobile": "${this.mobile}",
			"email": "test@test.com",
			"state": "0",
			"level": "VIP",
			"motto": "${this.introduceSign}"
		}`;
		
		postCMS(data).then(result => {
		  console.log('Result:',result);
		  sessionStorage.setItem('userinfo', JSON.stringify(result.data.upsertSuUser));
		  Toast.success('保存成功~');
		})
		.catch(error => {
		  console.log(error);
		});

	  
		alert(localStorage.getItem('token'));
		document.cookie = "name=oeschger";
		document.cookie = "favorite_food=tripe";
		alert(document.cookie);
	},
	onKeyboard() {
	  var isMobile = navigator.userAgent.match(/(iPad)|(iPhone)|(iPod)|(android)|(webOS)|(Win)/i);
	  console.log(navigator.userAgent);
	  console.log(isMobile[0]);
	  console.log(this.win);
	  if (isMobile[0]=='Win'){
		this.win = true;
	  }
	  else {
		this.show = true;
	  }
	},
	datePicker() {
	  Toast('datepicker');
	  this.showdate = true;
	},
	cancelPicker () {
	  this.showdate = false;
	  this.birth = '';
	},
	confirmPicker (value) {
	  this.showdate = false;
	  value.setHours(8)
	  Toast(value.toDateString());
	  console.log('toDateString',value.toDateString());
	  console.log('toLocaleString',value.toLocaleString());
	  console.log('toISOString',value.toISOString());
	  this.birth = value.toISOString().slice(0,value.toISOString().indexOf("T"));
	},
	getSnapshot(){
		if(this.$store.getters.gettersUserInfo.snapshot) {
			console.log('Y-getSnapshot');
			return this.$store.getters.gettersUserInfo.snapshot
		} else {
			console.log('N-getSnapshot');
			return {"url":"https://vcunited.club/wp-content/uploads/2020/01/No-image-available-2.jpg"}
		}
	}
  }
}
</script>

<style lang="scss" scoped>
  .seting-box {
    .save-btn {
      width: 50%;
      margin: 50px auto;
      display: grid;
    }
    margin: auto;
	display: grid;
  }
  .van-cell-group {
      background-color: transparent;
  }
  
  
  .input-item {
	  .van-cell {
		background-color: transparent;
		margin-top: 12px;
	  }
  }
  
  .div-cell {
	  background-color: #3bba63;
	  color: #FFF;
	  padding: 1rem;
  }

</style>
