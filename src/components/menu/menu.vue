<template>
    <div class="nav">
        <div class="nav-menu-wrapper">
            <ul class="menu-list">
                <li
                    v-for="(item, index) in menuList"
                    :key="index"
                    :class="{
                        activeNav: item.routerPath == user_store.menuCurrent,
                    }"
                    @click="changeMenu(item.routerPath)"
                >
                    <div class="block"></div>
                    <span
                        :class="['iconfont', item.icon]"
                        style="color: #757889;font-size: 25px;"
                    ></span>
                </li>
            </ul>
        </div>
        <div class="own-pic">
            <!-- <HeadPortrait :imgUrl="imgUrl"></HeadPortrait> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import userStore from "../../store/user";

let user_store = userStore();
const router = useRouter();

let menuList = ref([
    {
        icon: "icon-xiaoxi1",
        routerPath: "/home",
    },
    {
        icon: "icon-shandian",
    },
    {
        icon: "icon-tianjiahaoyou",
        routerPath: "/addFriends",
    },
    {
        icon: "icon-Leaf",
    },
    {
        icon: "icon-shezhixitongshezhigongnengshezhishuxing",
    },
]);

const changeMenu = (routerPath) => {
    if(!routerPath) return alert("暂未开放")
    user_store.menuCurrent = routerPath;
    router.replace({
        path:routerPath,
    });
};
</script>

<style lang="scss" scoped>
.nav {
    width: 100px;
    height: 100%;
    position: relative;
    .nav-menu-wrapper {
        .menu-list {

            li {
                padding: 20px;
                text-align: center;
                list-style: none;
                cursor: pointer;
                position: relative;
                .block {
                    background-color: rgb(29, 144, 245);
                    position: absolute;
                    left: 0px;
                    width: 6px;
                    height: 25px;
                    transition: 0.5s;
                    border-top-right-radius: 4px;
                    border-bottom-right-radius: 4px;
                    opacity: 0;
                }
                &:hover {
                    span {
                        color: rgb(29, 144, 245);
                    }
                    .block {
                        opacity: 1;
                    }
                }
            }
        }
    }
    .own-pic {
        position: absolute;
        bottom: 10%;
        margin-left: 25px;
    }
}
.activeNav {
    span {
        color: rgb(29, 144, 245) !important;
    }
    .block {
        opacity: 1 !important;
    }
}
</style>
