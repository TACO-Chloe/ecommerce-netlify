<template>
	<div>
		<van-uploader v-model="fileList" multiple 
				:max-count="1"
				:deletable="false"
				:before-read="beforeRead" 
				:after-read="afterRead" 
				:max-size="500 * 1024"			
				@oversize="onOversize" >
			<img :src="imgSrc" alt="">
		</van-uploader>
		<van-popup v-model="show"><img src="/icon-loading.svg"></van-popup>
	</div>
</template>


<script>
import { Toast } from 'vant';
import axios from "axios";

export default {
  props: {
	img: {
	  type: String,
	  default: ''
	},
  },
  data() {
    return {
      fileList: [

      ],
	  user_image: {
        login_icon: require('./../images/mine/defaultImg.jpeg'),
        noLogin_icon: require('./../images/login/grey.jpg'),
        female: require('./../images/mine/female.png'),
        male: require('./../images/mine/male.png')
      },
	  imgSrc: this.img,
	  show: false,
	  message: ""
    };
  },
  methods: {
    afterRead(file) {
	  //this.postData.push(file);
	  //file.status = 'uploading';
	  //file.message = '上传中...';
	  this.show = true;
	  console.log(file);
	  
	  //this.files.name = file.file.name; // 获取文件名

      //this.files.type = file.file.type; // 获取类型
	  
      let url = 'https://api-ap-northeast-1.graphcms.com/v2/ckm1b1lzcbj5801xu6yqlfh53/master/upload';
	  //let url = `${process.env.GRAPHCMS_ENDPOINT}/upload`;
      
	  let formData = new FormData()
	  
      formData.append('fileUpload', file.file);
      
	  setTimeout(() => {
		  axios.post(url, formData, {headers: {'Content-Type': 'multipart/form-data'}}).then(result => {
			file.status = 'done';
			file.message = '上传成功';
			console.log('Upload-result',result);
			this.imgSrc = result.data.url;
			this.show = false;
			const userInfo = this.$store.getters.gettersUserInfo;
			userInfo.snapshot.id = result.data.id;
			userInfo.snapshot.url = result.data.url;
			console.log('Upload-userInfo',userInfo)
			this.$store.commit("setUserInfo", JSON.stringify(userInfo));
			sessionStorage.setItem('userinfo', JSON.stringify(userInfo));
		  }).catch(error => {
			file.status = 'failed';
			file.message = '上传失败';
			console.log(error);
			alert(error)
		  })
	  }, 1000);
    },
	//onOversize(file) {
      //console.log(file);
      //Toast('文件大小不能超过 500kb');
    //},
	// 返回布尔值
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },

  },
};

</script>

<style lang="scss" scoped>
img {
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
}

/deep/ .van-image {
	width: 4rem;
	height: 4rem;
	border-radius: 50%;
}

.van-popup {
	background-color: transparent;
}




.sex {
  position: absolute;
  top: 3.5rem;
  left: 3.8rem;
  width: 0.1rem;
  height: 0.1rem;
  img {
	width: 1rem;
	height: 1rem;
  }
}



</style>