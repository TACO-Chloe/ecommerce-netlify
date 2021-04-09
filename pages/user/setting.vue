<template>
  <div class="seting-box">
    <app-navbar :title="'我的消息'" />
	<van-cell-group style="margin-top:3rem">
	  	<app-uploader />
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
import AppNavbar from "~/components/AppNavbar.vue";
import AppUploader from "~/components/AppUploader.vue";
import { Toast } from 'vant'
export default {
  components: {
    AppNavbar,
	AppUploader
  },
  data() {
    return {
	  nickName: '',
      gender: 'M',
	  birth: '',
	  mobile: '',
	  introduceSign: '',
	  show: false,
	  showdate: false,
	  win: false,
	  minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
	  currentDate: new Date(new Date().getFullYear() -20 , 0, 1)
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
	  Toast(value.toDateString());
	  console.log(value.toDateString());
	  console.log(value.toLocaleString());
	  this.birth = value.toLocaleString().slice(0,value.toLocaleString().indexOf(" "));
	}
  },
  setup() {
    const state = reactive({
      nickName: '',
      introduceSign: '',
      password: ''
    })

    onMounted(async () => {
      const { data } = await getUserInfo()
      state.nickName = data.nickName
      state.introduceSign = data.introduceSign
    })

    const save = async () => {
      const params = {
        introduceSign: state.introduceSign,
        nickName: state.nickName
      }
      if (state.password) {
        //params.passwordMd5 = md5(state.password)
      } 
      await EditUserInfo(params)
      Toast.success('保存成功')
    }

    const handleLogout = async () => {
      const { resultCode } = await logout()
      if (resultCode == 200) {
        setLocal('token', '')
        window.location.href = '/home'
      }
    }

    return {
      ...toRefs(state),
      save,
      handleLogout
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

</style>
