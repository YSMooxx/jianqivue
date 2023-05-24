<template>
  <div class="upload-img">
    <a-upload
      v-model:file-list="fileList"
      :before-upload="beforeUpload"
      :custom-request="uploadFileFn"
      :show-upload-list="false"
      class="avatar-uploader"
      list-type="picture-card"
      name="avatar"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" height="220" width="360" />
      <div v-else>
        <LoadingOutlined v-if="loading" />
        <PlusOutlined v-else />
      </div>
    </a-upload>
    <div class="tip">仅限（PNG，JPG）格式</div>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue'
import { ref } from 'vue'
import { uploadBase64 } from '@/api/uploadFile'

const emit = defineEmits(['upload'])

function getBase64(img, callback) {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}

const fileList = ref([])
const loading = ref(false)
const imageUrl = ref('')

const beforeUpload = (file) => {
  let _type = file.name
  _type = _type.substring(_type.lastIndexOf('.') + 1).toLocaleLowerCase()
  let isJpgOrPng = true
  let allowType = 'jpg|png|jpeg'
  if (allowType.toLocaleLowerCase().indexOf(_type) === -1) {
    message.warning({
      content: '上传文件类型不正确，请重新上传',
      duration: 3
    })
    isJpgOrPng = false
  }

  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isLt2M) {
    message.error('图片必须小于2MB!')
  }
  return isJpgOrPng && isLt2M
}

const uploadFileFn = (file) => {
  getBase64(file.file, (base64Url) => {
    loading.value = true
    let userId = 1
    let _params = {
      from: 'img资料',
      userId: userId, //后台约定传1
      base64: base64Url
    }
    uploadBase64(_params)
      .then((res) => {
        file.onSuccess(res.data, file)
        imageUrl.value = res.data.fileUrl
        loading.value = false
        emit('upload', res.data.id)
      })
      .catch((error) => {
        console.log(error)
      })
  })
}
</script>

<style scoped lang="less">
.upload-img {
  .avatar-uploader {
    width: 360px;
    height: 220px;

    .ant-upload {
      width: 360px !important;
      height: 220px !important;
      padding: 0 !important;
      background: #eff1f4;
      border-radius: 4px;
      // border: 1px solid #b9bfc7;
    }

    .ant-upload-select-picture-card i {
      font-size: 32px;
      color: #999;
    }

    .ant-upload-select-picture-card .ant-upload-text {
      margin-top: 8px;
      color: #666;
    }

    .anticon-plus {
      font-size: 3em;
      color: #b9bfc7;
    }
  }

  .tip {
    margin-top: 5px;
    font-size: 12px;
    color: #abb1b7;
  }
}
</style>
