import { createApp } from 'vue'
import 'normalize.css'
import router from '@/routes'
import '@/routes/permission'
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'

const pinia = createPinia()
// pinia setup形式写法需要重写$reset方法
pinia.use(({ store }) => {
  const initialState = JSON.parse(JSON.stringify(store.$state))
  store.$reset = () => {
    store.$state = JSON.parse(JSON.stringify(initialState))
  }
})
// pinia 持久化处理
pinia.use(piniaPluginPersist)

const app = createApp(App)
app.use(pinia).use(router).mount('#app')
