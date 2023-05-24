import { useMenuStore } from './menu'
import { useSettingStore } from './setting'
import { useUserStore } from './user'

const useStore = () => ({
  menuStore: useMenuStore(),
  userStore: useUserStore(),
  settingStore: useSettingStore()
})
export default useStore
