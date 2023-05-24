<template>
  <a-result status="404" title="404" sub-title="Sorry, the page you visited does not exist.">
    <template #extra>
      <a-button type="primary" @click="goHomePage">Back Home</a-button>
    </template>
  </a-result>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHomePage = () => {
  // router.push('/')
  const a = router.resolve('/')
  window.open(a.href, '_blank')
}
</script>

<style lang="less" scoped></style>
