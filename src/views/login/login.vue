<template>
    <div class="login-box">
        <div class="box">
            <div class="left">
                <video
                    src="../../assets/video/bzh.mp4"
                    loop
                    autoplay
                    muted
                    class="left-img"
                ></video>
            </div>
            <div class="right">
                <span>登 录</span>
                <input
                    v-model="ruleForm.username"
                    class="user-inp"
                    type="text"
                    placeholder="用户名"
                />
                <input
                    v-model="ruleForm.password"
                    class="user-inp"
                    type="password"
                    placeholder="密码"
                />
                <input
                    class="submit"
                    type="submit"
                    value="登录"
                    @click="login"
                />
                <div class="fn">
                    <span>注册账号</span>
                    <span>找回密码</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup >
import { userLoginApi ,getUserInfoApi} from "../../axios/api";
import { reactive, ref,onMounted } from "vue";
import {useRouter} from "vue-router"
import showmsg from "../../utils/loading.jsx"

import userStore from "../../store/user"
import wsStore from "../../store/ws"

const router=useRouter()
let user_store = userStore()
let ws_store = wsStore()
const ruleForm = reactive({
    username: "",
    password: "",
});

const login = async() => {

    // let aa = showmsg("你回家")

    // aa.close()

    // return 
   let res = await userLoginApi({
        account: ruleForm.username,
        password: ruleForm.password,
    })
    if(res.code != 200) return 
    let {token} = res
    user_store.token = token
    router.replace("/home")
};
onMounted(()=>{
})

</script>
<style scoped lang="scss">
@import "./login.scss";
</style>
