<template>
  <a-layout>
    <a-layout-sider v-model:collapsed="opened" :trigger="null" collapsible>
      <div class="logo" />
      <!--  侧边栏    -->
      <SideBar class="sidebar-container" />
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0; height: auto">
        <NavBar />
      </a-layout-header>
      <a-layout-content
        :style="{
          margin: '24px 16px',
          padding: '24px',
          background: '#fff',
          height: 'calc(100vh - 98px)',
          overflow: 'auto'
        }"
      >
        <AppMain />
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script setup>
import { NavBar, AppMain, SideBar } from './components/admin'
import { storeToRefs } from 'pinia'
import useStore from '@/stores'

const { menuStore } = useStore()
const { opened } = storeToRefs(menuStore)
</script>
<style lang="less" scoped></style>
