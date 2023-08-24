
import { defineStore } from 'pinia'
import userStore from "./user";
import WebSocketManager from "../axios/ws"



const wsStore = defineStore('wsSocket', {
    state: () => {
        return {
            connection: null,
        }
    },
    actions: {
        wsConnection() {
            let user_store = userStore()
            if (!WebSocketManager.instance) {
                WebSocketManager.instance = new WebSocketManager("ws://192.168.10.105:3001/socketTest", [user_store.token])
                WebSocketManager.instance.websocket.addEventListener('open', () => {
                    console.log("链接成功")
                })
                this.connection = WebSocketManager.instance.websocket
                this.connection.addEventListener('close', () => {
                    WebSocketManager.instance = null
                    this.wsConnection()
                })

            }else{
                console.log("连接中")
            }

        },
        wsMessae(fn) {
            this.connection.addEventListener('message', (msg) => {
                //排除心跳
                if (msg.data !== 'heartbeat') {
                    fn(msg)
                }
            })

        }
    },
})
export default wsStore