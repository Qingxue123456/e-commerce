// 引入初始化的样式文件
import '@/styles/common.scss'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
// 引入懒加载指令插件并注册
import { lazyPlugin } from './directives'
// 引入全局组件插件
import { componentPlugin } from './components'
// 引入pinia持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)

// pinia持久化
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(lazyPlugin)
app.use(componentPlugin)
app.use(router)
app.mount('#app')
