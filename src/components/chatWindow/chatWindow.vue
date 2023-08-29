<template>
    <div class="chat-window">
        <div class="top">
            <div class="head-pic"></div>
            <div class="info-detail">
                <div class="name">{{ props.frinedInfo.nickName }}</div>
                <div class="detail">{{ props.frinedInfo.signature }}</div>
            </div>
            <div class="other-fun">
                <span class="iconfont icon-shipin" @click="video"> </span>
                <span
                    class="iconfont icon-gf-telephone"
                    @click="telephone"
                ></span>
                <label for="docFile">
                    <span class="iconfont icon-wenjian"></span>
                </label>
                <label for="imgFile">
                    <span class="iconfont icon-tupian"></span>
                </label>
                <input
                    type="file"
                    name=""
                    id="imgFile"
                    @change="sendImg"
                    accept="image/*"
                />
                <input
                    type="file"
                    name=""
                    id="docFile"
                    @change="sendFile"
                    accept="application/*,text/*"
                />
            </div>
        </div>
        <div class="botoom">
            <div
                class="chat-content"
                ref="chatContent"
                v-if="chat.chatList.length != 0"
            >
                <div
                    class="chat-wrapper"
                    v-for="(item, index) in chat.chatList"
                    :key="item.id"
                >
                    <div
                        class="chat-friend"
                        ref="setChatRef"
                        :data-id="index"
                        v-if="item.userinfo.id != user_store.userInfo.id"
                    >
                        <div
                            class="chat-text"
                            v-if="item.type == 0"
                            @contextmenu.prevent="rightClickMsg"
                            v-html="item.message"
                        >
                        </div>
                        <div class="chat-img" v-if="item.chatType == 1">
                            <img
                                :src="item.message"
                                alt="表情"
                                v-if="item.extend.imgType == 1"
                                style="width: 100px; height: 100px"
                            />
                        </div>
                        <div class="chat-img" v-if="item.chatType == 2">
                            <div class="word-file">
                                <FileCard
                                    :fileType="item.extend.fileType"
                                    :file="item.msg"
                                ></FileCard>
                            </div>
                        </div>
                        <div class="info-time">
                            <img :src="item.userinfo.header" alt="" />
                            <span>{{ item.userinfo.nickName }}</span>
                            <span>{{ item.createAt }}</span>
                        </div>
                    </div>
                    <div
                        class="chat-me"
                        ref="setChatRef"
                        :data-id="index"
                        v-else
                    >
                        <div class="chat-text" v-if="item.type == 0" v-html="item.message">
                           
                        </div>
                        <div class="chat-img" v-if="item.type == 1">
                            <img
                                :src="item.message"
                                alt="表情"
                                style="width: 100px; height: 100px"
                            />
                        </div>
                        <!-- <div class="chat-img" v-if="item.chatType == 2">
                            <div class="word-file">
                                <FileCard
                                    :fileType="item.extend.fileType"
                                    :file="item.msg"
                                ></FileCard>
                            </div>
                        </div> -->
                        <div class="info-time">
                            <span>{{ item.userinfo.nickName }}</span>
                            <span>{{ item.createAt }}</span>
                            <img
                                :src="item.userinfo.header"
                                alt=""
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div class="chatInputs">
                <div class="emoji boxinput" @click="clickEmoji">
                    <img src="../../assets/img/emoji/smiling-face.png" alt="" />
                </div>
                <div class="emoji-content">
                    <emoji
                        v-if="showEmoji"
                        @sendEmoji="sendEmoji"
                        @closeEmoji="clickEmoji"
                    ></emoji>
                </div>
                <input
                    class="inputs"
                    v-model="chat.user_inp"
                    @keydown.enter="sendText"
                    maxlength="500"
                />
                <div class="send boxinput" @click="sendText">
                    <img src="../../assets/img/emoji/rocket.png" alt="" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { watch, onMounted, ref, reactive, nextTick,defineAsyncComponent } from "vue";
import { getChatMassAge, readChatMassageApi } from "../../axios/api";
import userStore from "../../store/user";
import wsStore from "../../store/ws";
import FileCard from "../fileCard/fileCard.vue";
import loading from "../../utils/loading";

//表情组件
const emoji = defineAsyncComponent(()=> import("../Emoji/Emoji.vue"))

//导入存储在缓存的用户信息
let user_store = userStore();
let ws_store = wsStore();
let props = defineProps({
    //点击到的好友信息
    frinedInfo: {
        type: Object,
        default: () => {},
    },
});
const aa = (e) => {
    console.log(123, e);
};
let chat = reactive({
    chatList: [], //与好友的聊天记录
    user_inp: "", //用户输入的数据
});

//右键点击事件
const rightClickMsg = (e) => {
    let aa = loading("你好啊")
    setTimeout(()=>{
    //    aa.close()
    },2000)
    e.preventDefault();
};

//聊天内容的dom
let setChatRef = ref([]);
//是否显示表情框
let showEmoji = ref(false);

watch(
    () => props.frinedInfo,
    async (newVal, oldVal) => {
        readChatMassage();
        await getchatmsg(newVal.id);
        scrollBottom();
    }
);
//将消息变成已读状态
const readChatMassage = async () => {
    await readChatMassageApi({ friendId: props.frinedInfo.id });
};

// 监听接受的消息
ws_store.wsMessae(async (msg) => {
    
    console.log("接收信息",msg)
    //重新获取聊天记录
    await getchatmsg(props.frinedInfo.id);
    scrollBottom("smooth");
});
onMounted(async () => {
    //将未读转成已读
    readChatMassage();
    //获取聊天记录
    await getchatmsg(props.frinedInfo.id);
    //滚动到最后一条信息
    scrollBottom();
});

//滚动到最后一条信息
const scrollBottom = (behavior = "auto") => {
    nextTick(() => {
        if (setChatRef.value.length == 0) return;
        //寻找
        let target = setChatRef.value.filter(
            (item) =>
                item.getAttribute("data-id") == setChatRef.value.length - 1
        );

        target[0].scrollIntoView({
            behavior, // 平滑过渡
            block: "center", // 上边框与视窗顶部平齐。默认值
        });
    });
};

//获取聊天记录
const getchatmsg = async (friendId) => {
    let chat_msg = await getChatMassAge({ friendId });
    chat.chatList = chat_msg.data;
    let regex = /(https?|http|ftp|file):\/\/[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]/g;
    chat.chatList.forEach(item=>{
        item.message = `<span>${item.message.replace(regex, '<a href="$&">$&</a>')}</span>` ;
    })
};

const sendText = async () => {
    if (chat.user_inp == "") return;

    ws_store.connection.send(
        JSON.stringify({
            friendId: props.frinedInfo.id,
            message: chat.user_inp,
            type: "0",
        })
    );
    // //清空一下文本框
    chat.user_inp = "";
    await getchatmsg(props.frinedInfo.id);
    scrollBottom("smooth");
    // console.log(send_res);
};

const clickEmoji = () => {
    showEmoji.value = !showEmoji.value;
};
const sendEmoji = (e) => {
    console.log(e);
};
</script>

<style>
@import url("./chatWindow.scss");
</style>
