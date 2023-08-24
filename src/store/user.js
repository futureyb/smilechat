
import { defineStore } from 'pinia'

const useUserStore = defineStore('counter', {
    state: () => {
        return {
            token: '',
            userInfo:null,
            menuCurrent:"/home"
        }
    },
    getters: {
        total() {
            return this.count * this.count
        }

    },
    actions: {
        
    },
    persist: {
        key: 'user',    
        storage: localStorage,
      }

})
export default useUserStore