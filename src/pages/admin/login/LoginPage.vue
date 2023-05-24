<template>
  <div class="login-container">
    <a-form :model="loginForm" :rules="loginRules" autocomplete="off" class="login-form">
      <div class="title-container">
        <h3 class="title">Login Form</h3>
      </div>

      <a-form-item name="username">
        <a-input v-model:value="loginForm.username" :bordered="false" placeholder="Username">
          <template #prefix>
            <UserOutlined style="color: #8b8b8b; font-size: 16px; font-weight: bolder" />
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-input-password
          v-model:value="loginForm.password"
          :bordered="false"
          placeholder="Password"
          @keyup.enter="handleLogin"
        >
          <template #prefix>
            <LockOutlined style="color: #8b8b8b; font-size: 16px; font-weight: bolder" />
          </template>
        </a-input-password>
      </a-form-item>
      <!--
      <a-form-item :wrapper-col="{ offset: 1, span: 8 }" name="remember">
        <a-checkbox v-model:checked="loginForm.remember"
          >Remember me
        </a-checkbox>
      </a-form-item>-->

      <a-form-item>
        <a-button
          :loading="loading"
          html-type="submit"
          size="large"
          style="width: 100%"
          type="primary"
          @click.prevent="handleLogin"
        >
          Submit
        </a-button>
      </a-form-item>
      <div class="tips">
        <span style="margin-right: 20px">username: admin</span>
        <span>password: any</span>
      </div>
    </a-form>
  </div>
</template>

<script setup>
import { reactive, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/stores'
import { Form } from 'ant-design-vue'

const { userStore } = useStore()
const route = useRoute()
const router = useRouter()

const validateUsername = (rule, value) => {
  if (!value) {
    return Promise.reject('请请输入账号')
  } else {
    return Promise.resolve()
  }
}
const validatePassword = (rule, value) => {
  if (value.length < 6) {
    return Promise.reject('密码长度不能小于6位')
  } else {
    return Promise.resolve()
  }
}

const loginForm = reactive({
  username: 'admin',
  password: '111111'
})

const loginRules = reactive({
  username: [{ required: true, trigger: 'blur', validator: validateUsername }],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
})

const useForm = Form.useForm
const { validate } = useForm(loginForm, loginRules)
const loading = ref(false)
const redirect = ref(null)

watch(
  () => route.path,
  () => {
    redirect.value = route.query && route.query.redirect
  },
  { immediate: true }
)

const handleLogin = () => {
  validate()
    .then(() => {
      loading.value = true
      userStore
        .login(loginForm)
        .then(() => {
          router.push({ path: redirect.value || '/admin' })
          loading.value = false
        })
        .catch(() => {
          loading.value = false
        })
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>

<style scoped lang="less">
@bg: #283443;
@light_gray: #fff;
@cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: @cursor)) {
  .login-container input {
    color: @cursor;
  }
}

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: @bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: @light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .ant-form-item-control-input-content {
    display: flex;
    justify-content: center;

    .ant-input-affix-wrapper {
      height: 47px;
      align-items: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: @light_gray;
        height: 47px;
        caret-color: @cursor;

        &:-webkit-autofill {
          box-shadow: 0 0 0px 1000px @bg inset !important;
          -webkit-text-fill-color: @cursor !important;
        }
      }
    }
  }
}
</style>
