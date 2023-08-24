<template>
    <div class="home-box">
        <div class="left-nav-box">
            <div class="left-nav-header">
                <img
                    :src="user_store.userInfo?.header"
                    class="left-nav-header-img"
                />
            </div>
            <menu-list
                style="
                    width: 100px;
                    height: calc(100vh - 100px);
                    background: #272a37;
                "
            ></menu-list>
        </div>

        <div style="flex: 1; background: #272a37">
            <div class="chatHome">
                <div class="chatLeft">
                    <div class="title">
                        <h1>浅笑</h1>
                    </div>
                    <div class="online-person" >
                        <span class="onlin-text">聊天列表</span>
                        <div class="person-cards-wrapper">
                            <div
                                class="personList"
                                v-for="item in user_info.personList"
                                :key="item.id"
                                @click="clickPerson(item)"
                            >
                                <person-card
                                    :personInfo="item"
                                    :pcCurrent="pcCurrent"
                                ></person-card>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chatRight">
                    <div v-if="showChatWindow">
                        <chat-window :frinedInfo="chatWindowInfo"></chat-window>
                    </div>
                    <div class="showIcon" v-else>
                        <span class="iconfont icon-snapchat"></span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, ref, toRef } from "vue";
import { getUserFriendsApi, getUserInfoApi } from "../../axios/api";
import menuList from "../../components/menu/menu.vue";
import personCard from "../../components/personCard/personCard.vue";
import chatWindow from "../../components/chatWindow/chatWindow.vue";
import userStore from "../../store/user";
import wsStore from "../../store/ws";
let user_store = userStore();
let ws_store = wsStore();

let user_info = reactive({
    personList: [],
});
const aa = (e)=>{
    console.log(123,e)
}

let pcCurrent = ref("");
let showChatWindow = ref(false);
let chatWindowInfo = reactive({});
const clickPerson = (info) => {
    showChatWindow.value = true;
    chatWindowInfo = info;
    pcCurrent.value = info.id;
};

onMounted(async () => {
    //  获取个人信息
    let user_res = await getUserInfoApi();
    //赋值到store中
    user_store.userInfo = user_res.data;
    let friend_res = await getUserFriendsApi();
    if (friend_res.code == 200) {
        user_info.personList = friend_res.data;
    }
});
</script>
<style lang="scss">
@import url("./media.scss");
.home-box {
    display: flex;

    .left-nav-box {
        display: flex;
        flex-direction: column;
        background: #272a37;
        align-items: center;
        .left-nav-header {
            width: 100%;
            height: 100px;
            display: flex;
            justify-content: center;
            align-items: center;
            .left-nav-header-img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }
        }
    }
}
.chatHome {
    // margin-top: 20px;
    display: flex;
    .chatLeft {
        width: 280px;
        .title {
            color: #fff;
            padding: 10px;
            box-sizing: border-box;
        }
        .online-person {
            .onlin-text {
                padding-left: 10px;
                color: rgb(176, 178, 189);
            }
            .person-cards-wrapper {
                padding: 0 10px 0 10px;
                height: 65vh;
                margin-top: 20px;
                overflow: hidden;
                overflow-y: scroll;
                box-sizing: border-box;
                &::-webkit-scrollbar {
                    width: 0; /* Safari,Chrome 隐藏滚动条 */
                    height: 0; /* Safari,Chrome 隐藏滚动条 */
                    display: none; /* 移动端、pad 上Safari，Chrome，隐藏滚动条 */
                }
            }
        }
    }

    .chatRight {
        flex: 1;
        padding-right: 30px;
        .showIcon {
            position: absolute;
            top: calc(50% - 150px); /*垂直居中 */
            left: calc(50% - 50px); /*水平居中 */
            .icon-snapchat {
                width: 300px;
                height: 300px;
                font-size: 300px;
                // color: rgb(28, 30, 44);
            }
        }
    }
}
</style>
