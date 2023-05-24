import { defineStore } from 'pinia'
import defaultSettings from '@/utils/settings'
import { reactive, toRefs } from 'vue'

export const useSettingStore = defineStore(
  'setting',
  () => {
    // state
    const { title, sidebarLogo, accordionStyle } = toRefs(reactive(defaultSettings))
    //action
    return { title, sidebarLogo, accordionStyle }
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: 'setting',
          storage: localStorage
        }
      ]
    }
  }
)
