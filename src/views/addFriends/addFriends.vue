<template>
    <div class="main">
        <div class="menu-list">
            <div class="menu-header-box">
                <img class="menu-header"  :src="user_store.userInfo?.header" alt="">
            </div>
            <menuList></menuList> 
        </div>
    </div>
</template>

<script setup>
import menuList from "../../components/menu/menu.vue";
import userStore from "../../store/user";
import wsStore from "../../store/ws";
let user_store = userStore();
let ws_store = wsStore();
</script>

<style lang="scss">
.main{
    max-width:100%;
    height: 100vh;
.menu-header-box{
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    .menu-header{
        width: 50px;
        height: 50px;
        border-radius: 50%;
    }
}
   
}
</style>