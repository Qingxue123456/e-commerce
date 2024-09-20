import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// elementPlus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        // 配置elementPlus采用sass样式配色系统
        ElementPlusResolver({ importStyle: "sass"})
      ],
    }),
  ],
  resolve: {
    // 实际路径转换
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
   // 自动导入定制化样式文件进行样式覆盖
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/element/index.scss" as *;
        @use "@/styles/var.scss" as *;
        `,
      },
    },
  },
})
