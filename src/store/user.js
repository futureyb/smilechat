
import { defineStore } from 'pinia'

const useUserStore = defineStore('counter', {
    state: () => {
        return {
            token: '',
            userInfo:null,
            menuCurrent:"/home",
            themeCurrent:'light'
        }
    },
    getters: {
        

    },
    actions: {
        changeTheme(val){
            val = val?val:this.themeCurrent
            window.document.documentElement.setAttribute("data-theme", val)
            this.themeCurrent = val
        }
    },
    persist: {
        key: 'user',    
        storage: localStorage,
      }

})
export default useUserStore