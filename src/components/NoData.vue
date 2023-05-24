<template>
  <div class="no-data">
    <img class="no-data-image" :src="src" />
    <span class="no-data-text">{{ text || '' }}</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'no-data-block',
  data() {
    return {}
  },
  props: {
    text: {
      type: String,
      default: '暂无数据'
    },
    src: {
      type: String,
      default: ''
    }
  },
  methods: {}
}
</script>
<style lang="less" scoped>
.no-data {
  width: 100%;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 64px;

  .no-data-image {
    width: 200px;
    height: 200px;
  }

  .no-data-text {
    text-align: center;
    font-size: 14px;
    color: #909090;
    margin-top: 24px;
  }
}
</style>
