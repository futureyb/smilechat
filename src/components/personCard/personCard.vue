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
    @include getCssAttribute("background","option_card_color");
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
                @include getCssAttribute("color","option_card_name_color",'false');
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                margin-bottom: 5px;
                width: 100%;
                font-weight: 600;
            }
            .detail {
                @include getCssAttribute("color","option_card_info_color",'false');  
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
        @include getCssAttribute("background-color","option_select_card_color");

        
        transition: 0.3s;
        @include getCssAttribute("background-color","option_select_card_color");
        @include setShowBox("option_select_card_shadow_color");
        .info {
            .info-detail {
                .name{
                    @include getCssAttribute("color","option_select_card_name_color");
                }
                .detail {
                     @include getCssAttribute("color","option_select_card_info_color");
                }
            }
        }
    }
    .massage-tip {
        min-width: 24px;
        height: 24px;
        @include getCssAttribute('background', 'option_select_card_tip_color');
        border-radius: 100%;
        display: flex;
        @include getCssAttribute('color', 'option_select_card_tip_font_color');
        align-items: center;
        justify-content: center;
        font-size: 12px;
    }
}
.activeCard {
    @include getCssAttribute("background-color","option_select_card_color");
    transition: 0.3s;
    @include setShowBox("option_select_card_shadow_color");
    .info {
        .info-detail {
            .name{
                @include getCssAttribute("color","option_select_card_name_color");
            }
            .detail {
                @include getCssAttribute("color","option_select_card_info_color");
            }
        }
    }
}
</style>
