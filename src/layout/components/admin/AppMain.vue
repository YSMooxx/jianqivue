<template>
  <section class="app-main">
    <router-view v-slot="{ Component }">
      <keep-alive :include="playView">
        <component :is="Component" :key="key" />
      </keep-alive>
    </router-view>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const key = computed(() => {
  return route.name
})

let list = []

const playView = computed(() => {
  if (route?.meta?.alive && !list.includes(route.name)) {
    list.push(route.name)
  }
  return list
})
</script>
<style scoped lang="less">
.app-main {
  width: 100%;
}
</style>
