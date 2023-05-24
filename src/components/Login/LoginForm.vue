<template>
  <div class="login-form-wrap">
    <div v-if="!resetPassFlag" class="form-title">
      <span
        v-for="item in menuTitle[currentMenu]"
        @click="selectFormType(item.value)"
        :key="item.value"
        :class="['title-item', item.value === formType && 'active']"
      >
        {{ item.label }}
      </span>
    </div>
    <a-form v-if="!resetPassFlag" class="login-form">
      <a-form-item v-bind="validateInfos.phone" v-if="formType != 'reset'">
        <a-input v-model:value="loginForm.phone" placeholder="请输入手机号"></a-input>
      </a-form-item>
      <a-form-item
        v-bind="validateInfos.verificationCode"
        v-if="['forget', 'register', 'fast'].includes(formType)"
      >
        <a-input-group compact class="item-code">
          <a-input
            v-model:value="loginForm.verificationCode"
            placeholder="请输入验证码"
            style="width: calc(100% - 102px)"
          />
          <a-button class="btn-default btn-code" type="primary">获取验证码</a-button>
        </a-input-group>
      </a-form-item>

      <a-form-item v-bind="validateInfos.password" v-if="['tradition', 'reset'].includes(formType)">
        <a-input
          v-model:value="loginForm.password"
          :type="flagType"
          placeholder="密码"
          class="password-item"
          @keyup.enter="handleLogin"
        >
          <template #suffix>
            <span @click="changeView">
              <icon v-if="flag">
                <template #component>
                  <DisplaySvg />
                </template>
              </icon>
              <icon v-else>
                <template #component>
                  <NoDisplaySvg />
                </template>
              </icon>
            </span>
          </template>
        </a-input>
      </a-form-item>
      <a-form-item v-bind="validateInfos.password2" v-if="['reset', 'register'].includes(formType)">
        <a-input
          v-model:value="loginForm.password2"
          :type="flagType"
          placeholder="密码"
          class="password-item"
          @keyup.enter="handleLogin"
        >
          <template #suffix>
            <span @click="changeView">
              <icon v-if="flag">
                <template #component>
                  <DisplaySvg />
                </template>
              </icon>
              <icon v-else>
                <template #component>
                  <NoDisplaySvg />
                </template>
              </icon>
            </span>
          </template>
        </a-input>
      </a-form-item>
      <a-button type="primary" class="btn-default btn-login" @click="formSet.clickFn">
        {{ formSet.text }}o
      </a-button>
      <div class="tool-bar">
        <div class="login-bar" v-if="formType === 'tradition'">
          <a-checkbox v-model:checked="loginForm.remember">记住密码</a-checkbox>
          <div class="tool-bar-right">
            <span @click="changeMenu('forget')">忘记密码</span>
            ｜
            <span @click="changeMenu('register')">注册</span>
          </div>
        </div>
        <div class="register-bar" v-if="['fast', 'tradition', 'register'].includes(formType)">
          <span class="tip-text">
            登录即表示已阅读并同意
            <a href="">《用户协议》</a>
            <a href="">《隐私政策》</a>
          </span>
          <span class="tip-text" v-if="formType === 'fast'">
            未注册的手机号或第三方账号验证后将自动创建新账
          </span>
        </div>
      </div>
    </a-form>
    <div class="reset-success" v-else>
      <img src="@/assets/img/icon_success.png" alt="" />
      <div class="success-tip">恭喜您！密码重置成功</div>
      <div class="default-tip">5秒后，将会自动跳转到首页</div>
      <a-button type="primary" class="btn-default btn-access" @click="handleAccess">
        立即进入
      </a-button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import NoDisplaySvg from '@/assets/img/svg/NoDisplaySvg.vue'
import DisplaySvg from '@/assets/img/svg/DisplaySvg.vue'
import Icon from '@ant-design/icons-vue'
import { Form } from 'ant-design-vue'
import { passwordRegExp, phoneRegExp } from '@/utils/util'
const password2RegExp = (rule: any, value: string) => {
  if (!value) {
    return Promise.reject('密码不能为空')
  } else if (loginForm.password != value) {
    return Promise.reject('密码不一致')
  } else {
    return Promise.resolve()
  }
}

// 标题map
const menuTitle: any = {
  login: [
    { label: '快捷登录', value: 'fast' },
    { label: '账号密码', value: 'tradition' }
  ],
  forget: [{ label: '忘记密码', value: 'forget' }],
  reset: [{ label: '修改密码', value: 'reset' }],
  register: [{ label: '用户注册', value: 'register' }]
}
// 表单标题设置
const currentMenu = ref('login')
const formType = ref('fast')
const changeMenu = (menu: string) => {
  currentMenu.value = menu
  selectFormType(menuTitle[menu][0].value)
}
const selectFormType = (type: string) => {
  formType.value = type
}

const formSet = computed(() => {
  let obj = {
    text: '',
    rules: {},
    clickFn: () => {}
  }
  switch (formType.value) {
    case 'fast':
      obj.text = '登录/注册'
      obj.rules = {
        phone: [{ required: true, validator: phoneRegExp }],
        verificationCode: [{ required: true, message: '验证码不能为空！' }]
      }
      break
    case 'tradition':
      obj.text = '登录'
      obj.rules = {
        phone: [{ required: true, validator: phoneRegExp }],
        password: [{ required: true, validator: passwordRegExp }]
      }
      obj.clickFn = handleLogin
      break
    case 'forget':
      obj.text = '下一步'
      obj.rules = {
        phone: [{ required: true, validator: phoneRegExp }],
        verificationCode: [{ required: true, message: '验证码不能为空！' }]
      }
      obj.clickFn = handleValidate
      break
    case 'reset':
      obj.text = '确定'
      obj.rules = {
        password: [{ required: true, validator: passwordRegExp }],
        password2: [{ required: true, validator: password2RegExp }]
      }
      obj.clickFn = handleReset
      break
    case 'register':
      obj.text = '注册'
      obj.rules = {
        phone: [{ required: true, validator: phoneRegExp }],
        verificationCode: [{ required: true, message: '验证码不能为空！' }],
        password: [{ required: true, validator: passwordRegExp }]
      }
      obj.clickFn = handleRegister
      break
  }
  loginRules.value = obj.rules
  return obj
})

// 密码框图标
const flagType = ref('password')
const flag = ref(false)
const changeView = () => {
  flag.value = !flag.value
  flagType.value = flag.value ? 'text' : 'password'
}

// 账号密码登录表单
const loginForm = reactive({
  phone: undefined,
  password: undefined,
  password2: undefined,
  verificationCode: undefined,
  remember: undefined
})

// 账号密码登录表单规则
let loginRules = ref({})

const useForm = Form.useForm
const { resetFields, validate, validateInfos } = useForm(loginForm, loginRules, {
  onValidate: (...args: any) => console.log(...args)
})

// 账号密码登录表单登录
const handleLogin = () => {
  validate()
    .then(() => {})
    .catch((err: any) => {
      console.log(err)
    })
}

// 忘记密码--验证手机号
const resetPassFlag = ref(false)
const handleValidate = () => {
  validate().then(() => {
    changeMenu('reset')
  })
  changeMenu('reset')
}
// 忘记密码--重置密码
const handleReset = () => {
  validate().then(() => {
    console.log('123')
    resetPassFlag.value = true
  })
}
// 忘记密码--立即进入
const handleAccess = () => {}

// 注册
const handleRegister = () => {
  validate().then(() => {
    console.log('123')
  })
}
</script>

<style lang="less">
.login-form-wrap {
  .btn-default {
    height: 40px;
    border-radius: 8px;
  }
  .login-form {
    .ant-form-item {
      margin-bottom: 32px;
      .ant-input {
        height: 40px;
        border: 1px solid #eff3f6;
        border-radius: 8px;
      }
      .item-code {
        .ant-input {
          border-radius: 8px 0 0 8px;
        }
        .btn-code {
          border-radius: 0 8px 8px 0;
        }
      }
      .password-item {
        border: 1px solid #eff3f6;
        border-radius: 8px;
        .ant-input {
          height: 30px;
          border: none;
        }
      }
    }
    .btn-login {
      width: 100%;
      margin-top: 16px;
    }
    .tool-bar {
      .login-bar {
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        .tool-bar-right {
          color: #8c8c8c;
          span {
            height: 22px;
            display: inline-block;
            line-height: 22px;
            cursor: pointer;
          }
        }
      }
      .register-bar {
        margin-top: 40px;
        color: #8c8c8c;
        .tip-text {
          height: 22px;
          display: inline-block;
          line-height: 22px;
        }
      }
    }
  }
  .reset-success {
    text-align: center;
    img {
      width: 120px;
      height: 120px;
    }
    .success-tip {
      font-size: 16px;
      color: @primary-color;
      height: 22px;
      line-height: 22px;
      margin-top: 40px;
    }
    .default-tip {
      font-size: 14px;
      color: #979797;
      height: 22px;
      line-height: 22px;
      margin-top: 16px;
    }
    .btn-access {
      width: 100%;
      margin-top: 40px;
    }
  }
}
</style>
