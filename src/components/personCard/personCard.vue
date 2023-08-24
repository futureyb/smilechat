<template>
    <div
        class="person-card"
        :class="{ activeCard: props.personInfo.id == props.pcCurrent }"
    >
        <div class="info">
            <div style="display: flex; align-items: center;flex: 1;">
                <head-portrait
                    :imgUrl="props.personInfo.header"
                ></head-portrait>
                <div class="info-detail">
                    <div class="name">{{ props.personInfo.nickName }}</div>
                    <div class="detail">{{ props.personInfo.signature }}</div>
                </div>
            </div>

            <div
                class="massage-tip"
                v-show="props.personInfo.unreadMessageCount != 0"
            >
                {{ props.personInfo.unreadMessageCount | 0 }}
            </div>
        </div>
    </div>
</template>

<script setup>
import HeadPortrait from "../HeadPortrait/HeadPortrait.vue";
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
</script>

<style lang="scss" scoped>
.person-card {
    width: 100%;
    height: 80px;
    border-radius: 10px;
    background-color: rgb(50, 54, 68);
    position: relative;
    margin: 25px 0;
    display: flex;
    padding: 10px;
    box-sizing: border-box;
    cursor: pointer;
    .info {
        width: 100%;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .info-detail {
            margin-left: 20px;
            .name {
                color: #fff;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 5px;
            }                                                              
            .detail {
                color: #5c6675;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: 12px;
            }
        }

        .massage-tip {
            min-width: 25px;
            height: 24px;
            background-color: #eebefa;
            border-radius: 100%;
            display: flex;
            color: #868e96;
            align-items: center;
            justify-content: center;
            font-size: 12px;
        }
    }
    &:hover {
        background-color: #1d90f5;
        transition: 0.3s;
        box-shadow: 0px 0px 10px 0px rgba(0, 136, 255);
        // box-shadow:  0 5px 20px rgba(251, 152, 11, .5);
        .info {
            .info-detail {
                flex: 1;
                .detail {
                    color: #fff;
                }
            }
        }
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
