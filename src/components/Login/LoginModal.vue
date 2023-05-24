<template>
  <a-modal
    v-model:visible="loginVisible"
    :width="440"
    :footer="null"
    :destroyOnClose="true"
    :maskClosable="false"
    class="login-modal"
    @cancel="closeModal"
  >
    <div class="login-modal-container">
      <h3 class="title">Login Form</h3>
      <login-form />
    </div>
  </a-modal>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import useStore from '@/stores'
import { useRouter } from 'vue-router'
import LoginForm from '@/components/Login/LoginForm.vue'

const { userStore } = useStore()

const { loginVisible, redirectUrl } = storeToRefs(userStore)
const loading = ref(false)
const router = useRouter()
// 登录
const handleLogin = (loginForm: any) => {
  loading.value = true
  userStore
    .login(loginForm)
    .then(() => {
      router.push(redirectUrl.value)
    })
    .finally(() => {
      closeModal()
    })
}

// 关闭弹窗
const closeModal = () => {
  loginVisible.value = false
}
</script>
<style lang="less">
.login-modal {
  .ant-modal-body {
    padding: 64px 40px 40px;
  }
  .login-modal-container {
    .form-title {
      margin-bottom: 46px;
      display: flex;
      justify-content: center;
      gap: 40px;
      .title-item {
        cursor: pointer;
        display: inline-block;
        height: 22px;
        font-size: 16px;
        line-height: 22px;
      }
      .active {
        color: @primary-color;
        position: relative;
        &::after {
          content: '';
          width: 24px;
          height: 2px;
          position: absolute;
          bottom: -4px;
          left: 50%;
          transform: translateX(-50%);
          background: @primary-color;
        }
      }
    }
  }
}
</style>
