import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
// @ts-ignore
import lessToJS from 'less-vars-to-js'
import * as fs from 'fs'

const themeVariables = lessToJS(fs.readFileSync(resolve('./src/assets/styles/theme.less'), 'utf8'))
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/dev': {
        target: 'http://192.168.0.108:9734',
        changeOrigin: true,
        cookieDomainRewrite: '',
        rewrite: (path) => path.replace(new RegExp(`/dev`), '')
      }
    }
  },
  plugins: [
    vue(),
    Components({
      resolvers: [AntDesignVueResolver()]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 全局添加less
        modifyVars: themeVariables,
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    // 配置别名
    alias: [{ find: '@', replacement: resolve(__dirname, 'src') }]
  },
  build: {
    minify: 'terser',
    terserOptions: {
      compress: {
        //生产环境时移除console.log()
        drop_console: true,
        drop_debugger: true
      }
    }
  }
})
