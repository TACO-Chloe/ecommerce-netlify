<template>

	<van-uploader v-model="fileList" 
				:before-read="beforeRead" 
				:after-read="afterRead" 
				:max-size="500 * 1024" 
				@oversize="onOversize" 
	/>
	
</template>


<script>
import { Toast } from 'vant'

export default {
  data() {
    return {
      fileList: [

      ],
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