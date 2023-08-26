<template>
    <div
        class="person-card"
        :class="{ activeCard: props.personInfo.id == props.pcCurrent }"
    >
        <div class="info">
            <head-portrait :imgUrl="props.personInfo.header"></head-portrait>
            <div class="info-detail">
                <div class="name">{{ props.personInfo.nickName }}</div>
                <div class="detail">
                    {{ props.personInfo.signature }}
                </div>
            </div>
        </div>
        <div
            class="massage-tip"
            v-show="props.personInfo.unreadMessageCount != 0"
        >
            {{ props.personInfo.unreadMessageCount | 0 }}
        </div>
    </div>
</template>

<script setup>
import HeadPortrait from "../HeadPortrait/HeadPortrait.vue";
import { onMounted, watch } from "vue";
let props = defineProps({
    //好友信息
    personInfo: {
        default: null,
    },
    //当前中的好友
    pcCurrent: {
        default: "",
    },
    //是否显示消息
    isShowInfo: {
        default: true,
    },
});


onMounted(()=>{
    console.log(props.pcCurrent)
    // if(pcCurrent){

    // }
})


</script>

<style lang="scss" scoped>
.person-card {
    width: 100%;
    height: 80px;
    border-radius: 10px;
    background-color: rgb(50, 54, 68);
    margin: 25px 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;

    .info {
        height: auto;
        display: flex;
        .info-detail {
            margin-left: 20px;
            .name {
                color: #fff;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 5px;
                width: 100%;
            }
            .detail {
                color: #5c6675;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 1; /*行数*/
                -webkit-box-orient: vertical;
                font-size: 12px;
                width: 100%;
            }
        }
    }
    &:hover {
        background-color: #1d90f5;
        transition: 0.3s;
        box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
        // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
        .info {
            .info-detail {
                .detail {
                    color: #fff;
                }
            }
        }
    }
    .massage-tip {
        min-width: 24px;
        height: 24px;
        background-color: #e03131;
        border-radius: 100%;
        display: flex;
        color: white;
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
}
.activeCard {
    background-color: #1d90f5;
    transition: 0.3s;
    box-shadow: 3px 2px 10px 0px rgba(0, 136, 255);
    .info {
        .info-detail {
            .detail {
                color: #fff;
            }
        }
    }
}
</style>
