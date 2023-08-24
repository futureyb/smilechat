import { createApp } from 'vue'
import './style.css'
import router from "./router/index"
import store from "./store/ws"
import App from './App.vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import WebSocketManager from "./axios/ws"
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
createApp(App).use(router).use(pinia).mount('#app')

router.beforeEach((to, from, next) => {
    if(to.name !== "login" && !WebSocketManager.instance ){
        store().wsConnection()
    }
    next()
})