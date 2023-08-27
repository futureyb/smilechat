import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from "@vitejs/plugin-vue-jsx"// 配置vue使用jsx
export default defineConfig({
  plugins: [vue(),vueJsx()],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/thems/_handel.scss";`, // 引入全局样式文件
      },
    },
  },
})
    