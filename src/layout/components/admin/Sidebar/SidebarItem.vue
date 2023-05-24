<template>
  <div v-if="!item?.meta.hidden">
    <template
      v-if="
        !item.alwaysShow &&
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren)
      "
    >
      <a-menu-item :key="onlyOneChild.path">
        <template v-if="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" #icon>
          <Icon :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)" />
        </template>
        {{ onlyOneChild.meta.title }}
      </a-menu-item>
    </template>

    <a-sub-menu v-else :key="item.path" ref="subMenu">
      <template v-if="item.meta.icon" #icon>
        <Icon :icon="item.meta && item.meta.icon" />
      </template>
      <template #title>
        {{ item.meta.title }}
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
        class="nest-menu"
      />
    </a-sub-menu>
  </div>
</template>

<script setup>
import Icon from '@/components/Icon'
import { ref } from 'vue'

defineProps({
  // route object
  item: {
    type: Object,
    required: true
  }
})
const onlyOneChild = ref(null)

const hasOneShowingChild = (children = [], parent) => {
  const showingChildren = children.filter((item) => {
    if (!item.meta || item.meta.hidden) {
      return false
    } else {
      // Temp set(will be used if only has one showing child)
      onlyOneChild.value = item
      return true
    }
  })

  // When there is only one child router, the child router is displayed by default
  if (showingChildren.length === 1) {
    return true
  }

  // Show parent if there are no child router to display
  if (showingChildren.length === 0) {
    onlyOneChild.value = { ...parent, noShowingChildren: true }
    return true
  }
  return false
}
</script>
