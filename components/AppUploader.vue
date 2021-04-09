<template>
	<div class="div-cell">
		<van-uploader v-model="fileList" 
				:before-read="beforeRead" 
				:after-read="afterRead" 
				:max-size="500 * 1024" 
				@oversize="onOversize" >
			<img :src="user_image.noLogin_icon" alt="">
		</van-uploader>
	</div>
</template>


<script>
import { Toast } from 'vant'

export default {
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
    };
  },
  methods: {
    afterRead(file) {
      file.status = 'uploading';
      file.message = '上传中...';

      setTimeout(() => {
        file.status = 'failed';
        file.message = '上传失败';
      }, 1000);
    },
	onOversize(file) {
      console.log(file);
      Toast('文件大小不能超过 500kb');
    },
	// 返回布尔值
    beforeRead(file) {
      if (file.type !== 'image/jpeg') {
        Toast('请上传 jpg 格式图片');
        return false;
      }
      return true;
    },
    // 返回 Promise
    asyncBeforeRead(file) {
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/jpeg') {
          Toast('请上传 jpg 格式图片');
          reject();
        } else {
          let img = new File(['foo'], 'bar.jpg', {
            type: 'image/jpeg',
          });
          resolve(img);
        }
      });
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

.div-cell {
  background-color: #3bba63;
  color: #FFF;
  padding: 1rem;
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