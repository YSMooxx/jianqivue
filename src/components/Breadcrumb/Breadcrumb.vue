<template>
  <a-breadcrumb class="app-breadcrumb" separator="/">
    <a-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
      <transition name="breadcrumb">
        <span v-if="index === levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
        <a v-else-if="index === 0" @click.prevent="handleLink(item.path)">{{ item.meta.title }}</a>
        <span v-else>{{ item.meta.title }}</span>
      </transition>
    </a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const levelList = ref(null)
const route = useRoute()
watch(
  () => route.path,
  () => {
    getBreadcrumb()
  }
)
// 获取面包屑导航
const getBreadcrumb = () => {
  // only show routes with meta.title
  let matched = route.matched.filter((item) => item.meta && item.meta.title) || []
  const first = matched[0]
  if (!isDashboard(first)) {
    matched = [{ path: '/dashboard', meta: { title: 'Dashboard' } }].concat(matched)
  }
  levelList.value = matched.filter((item) => item.meta && item.meta.title)
}
// 判断是否为 Dashboard 即后台首页
const isDashboard = (route) => {
  const name = route && route.name
  if (!name) {
    return false
  }
  return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
}

const router = useRouter()
const handleLink = (path) => {
  router.push(path)
}

onMounted(() => {
  getBreadcrumb()
})
</script>

<style lang="less" scoped>
.app-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
