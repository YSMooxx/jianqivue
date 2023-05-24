<template>
  <div class="navbar">
    <a-menu
      v-model:selectedKeys="selectedKeys"
      mode="horizontal"
      :selectable="false"
      :style="{ lineHeight: '64px' }"
      @click="goMenu"
    >
      <a-menu-item :key="item.path" v-for="item in getFontMenus">
        {{ item.meta.title }}
      </a-menu-item>
    </a-menu>
    <div class="right-menu">
      <a-dropdown :trigger="['click']">
        <div class="avatar-wrapper">
          <img alt="" :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
          <Icon icon="CaretDownOutlined" />
        </div>
        <template #overlay>
          <a-menu class="user-dropdown" @click="handleMenuFn">
            <router-link to="/">
              <a-menu-item>Home</a-menu-item>
            </router-link>
            <a-menu-divider />
            <a-menu-item key="logout">
              <span style="display: block">Log Out</span>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </div>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon'
import { storeToRefs } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import useStore from '@/stores'
import { onMounted, watch } from 'vue'
import { useLogin } from '@/hooks/useLogin'

const router = useRouter()
const route = useRoute()
const { menuStore, userStore } = useStore()
const { avatar } = storeToRefs(userStore)
const { selectedKeys, getFontMenus } = storeToRefs(menuStore)

// 路由跳转
const goMenu = (menuItem) => {
  router.push(menuItem.key)
}

// 头像菜单操作方法
const handleMenuFn = ({ key }) => {
  // 根据key判断操作
  if (key === 'logout') {
    logoutFn()
  }
}
const logoutFn = () => {
  userStore.logout().then(() => {
    router.push('/front/homePage')
  })
}
const initOpenKeys = () => {
  selectedKeys.value = [route.path]
}

watch(
  () => route.path,
  () => {
    initOpenKeys()
  }
)

onMounted(() => {
  initOpenKeys()
})
</script>

<style lang="less" scoped>
.navbar {
  display: flex;
  justify-content: space-between;

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
    line-height: 50px;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .avatar-wrapper {
      position: relative;
      display: flex;
      margin-right: 30px;
      margin-top: 5px;

      .user-avatar {
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 10px;
      }

      .anticon,
      .anticon-caret-down {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
}
</style>
