<template>
  <div>
    <!-- 拖拽形式上传 -->
    <a-upload-dragger
      v-if="uploadType === 1"
      v-model:file-list="data.fileList"
      :before-upload="beforeUpload"
      :custom-request="uploadFileFn"
      :remove="removeFileItem"
      :show-upload-list="isShow"
      multiple
      name="file"
    >
      <p class="ant-upload-drag-icon">
        <inbox-outlined></inbox-outlined>
      </p>
      <p class="ant-upload-text">点击或拖拽文件至此处</p>
      <p class="upload-text">{{ tipText }}</p>
    </a-upload-dragger>
    <!-- 按钮形式上传 -->
    <a-upload
      v-if="uploadType === 2"
      v-model:file-list="data.fileList"
      :before-upload="beforeUpload"
      :custom-request="uploadFileFn"
      :show-upload-list="isShow"
      name="file"
    >
      <a-button>
        <UploadOutlined />
        上传文件
      </a-button>
    </a-upload>
  </div>
</template>
<script setup>
import { message } from 'ant-design-vue'
import { reactive, watch } from 'vue'
import { uploadFile } from '@/api/uploadFile'

const props = defineProps({
  // 文件类型
  fileType: {
    type: String,
    default: 'xls|xlsx|docx|doc|csv|txt|ppt|pptx|jpg|jpeg|png|bmp|GIF|JPG|PNG|pictureunlock|PDF'
  },
  // 是否开启文件验证
  fileTypeFlag: {
    type: Boolean,
    default: true
  },
  // 文件数量
  fileSize: {
    type: Number,
    default: 1
  },
  // 提示文字
  tipText: {
    type: String,
    default: ''
  },
  // 文件列表
  filesList: {
    type: Array,
    default: () => []
  },
  isShow: {
    type: Boolean,
    default: true
  },
  // 上传组件形式
  uploadType: {
    type: Number,
    default: 1
  }
})
// upload 仅返回id  uploadList 返回全部信息
const emit = defineEmits(['uploadList'])

const data = reactive({
  fileList: props.filesList,
  allFileList: props.filesList,
  tipText: props.tipText,
  uploadType: props.uploadType,
  fileTypeFlag: props.fileTypeFlag
})

const beforeUpload = (file, fileList) => {
  // 上传类型限制
  let _type = file.name
  if (data.fileTypeFlag) {
    _type = _type.substring(_type.lastIndexOf('.') + 1).toLocaleLowerCase()
    if (props.fileType.toLocaleLowerCase().indexOf(_type) === -1) {
      message.warning({
        content: '上传文件类型不正确，请重新上传',
        duration: 3
      })
      fileList = fileList.pop()
      return false
    }
  }

  // 文件大小限制  限制6M
  let allowType = 'jpg|png|jpeg'
  if (allowType.toLocaleLowerCase().indexOf(_type) !== -1) {
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('图片必须小于2MB!')
      fileList.pop()
      return false
    }
  } else {
    const isLt6M = file.size / 1024 / 1024 < 6
    if (!isLt6M) {
      message.error('文件必须小于6MB!')
      fileList.pop()
      return false
    }
  }
}

const uploadFileFn = (fileInfo) => {
  // 上传数量限制
  if (data.allFileList.length >= props.fileSize) {
    message.warning(`最多上传${props.fileSize}个文件！`)
    data.allFileList.shift()
  }
  let file = fileInfo.file
  let fd = new FormData()
  fd.append('file', file)

  uploadFile(fd)
    .then((res) => {
      fileInfo.onSuccess(res.data, file)
      let _data = res.data
      if (props.fileSize !== 1) {
        data.allFileList.push({
          fileId: _data.id,
          uid: '-1',
          name: _data.fileName,
          url: _data.fileUrl //属性名必须url方可点击下载
        })
        emit('uploadList', data.allFileList)
      } else {
        data.allFileList = []
        data.allFileList.push({
          fileId: _data.id,
          uid: '-1',
          name: _data.fileName,
          url: _data.fileUrl //属性名必须url方可点击下载
        })
        emit('uploadList', data.allFileList)
      }
    })
    .catch((error) => {
      console.log(error)
    })
}
// 文件删除回调
const removeFileItem = (file) => {
  let index = data.fileList.findIndex((fileItem) => {
    return fileItem.fileId === file.fileId
  })
  if (index !== -1) {
    data.fileList.splice(index, 1)
    if (props.fileSize !== 1) {
      data.fileIdList.splice(index, 1)
      // emit('upload', data.fileIdList)
    } else {
      // emit('upload', null)
    }
    emit('uploadList', data.fileList)
  }
  return false
}
watch(
  () => props.filesList,
  (val) => {
    data.fileList = val
    data.allFileList = val
  }
)
</script>
<style scoped lang="less">
.upload-text {
  color: #666;
}
</style>
