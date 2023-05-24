<template>
  <div class="navbar">
    <hamburger
      :is-active="opened"
      class="hamburger-container"
      @toggle-click="menuStore.toggleSideBar"
    />
    <Breadcrumb class="breadcrumb-container" />
    <div class="right-menu">
      <a-dropdown :trigger="['click']">
        <div class="avatar-wrapper">
          <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar" />
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
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb.vue'
import Hamburger from '@/components/Hamburger/Hamburger.vue'
import Icon from '@/components/Icon'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
import useStore from '@/stores'

const router = useRouter()
const { menuStore, userStore } = useStore()
const { opened } = storeToRefs(menuStore)
const { avatar } = storeToRefs(userStore)

const handleMenuFn = ({ key }) => {
  // 根据key判断操作
  if (key === 'logout') {
    logoutFn()
  }
}
const logoutFn = () => {
  userStore.logout().then(() => {
    router.push('/admin/login')
  })
}
</script>

<style lang="less" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

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
