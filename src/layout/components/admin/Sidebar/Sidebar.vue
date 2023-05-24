<template>
  <div :class="{ 'has-logo': showLogo }">
    <Logo v-if="showLogo" :collapse="isCollapse" />
    <div class="scrollbar-wrapper">
      <a-menu
        v-model:openKeys="openKeys"
        v-model:selectedKeys="selectedKeys"
        mode="inline"
        trigger-sub-menu-action="click"
        @openChange="onOpenChange"
        @click="goMenu"
      >
        <sidebar-item
          v-for="route in routes"
          :key="route.path"
          :base-path="route.path"
          :item="route"
        />
      </a-menu>
    </div>
  </div>
</template>

<script setup>
import Logo from './Logo.vue'
import SidebarItem from './SidebarItem.vue'
import { computed, onMounted, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'
import useStore from '@/stores'

const { menuStore, settingStore } = useStore()
const { opened, selectedKeys, openKeys, getMenus } = storeToRefs(menuStore)
const { sidebarLogo, accordionStyle } = storeToRefs(settingStore)

const getRootSubmenuKeys = computed(() => {
  return getMenus.value.map((item) => item.path)
})

const routes = computed(() => {
  return getMenus.value
})

const showLogo = computed(() => {
  return sidebarLogo.value
})

const isCollapse = computed(() => {
  return !opened.value
})
// 菜单展开change
const onOpenChange = (keys) => {
  if (accordionStyle.value) {
    const latestOpenKey = keys.pop()
    if (getRootSubmenuKeys.value.indexOf(latestOpenKey) === -1) {
      openKeys.value = keys
    } else {
      openKeys.value = latestOpenKey ? [latestOpenKey] : []
    }
  } else {
    openKeys.value = keys
  }
}
const router = useRouter()
const route = useRoute()

// 路由跳转
const goMenu = (menuItem) => {
  router.push(menuItem.key)
  openKeys.value = menuItem.keyPath
}
const initOpenKeys = () => {
  openKeys.value = route.matched.map((item) => item.path)
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
