<template>
  <div class="emoji-content">
    <div class="emoji">
      <div class="emoji-wrapper">
        <ul class="emoji-list">
          <li
            class="emoji-item"
            v-for="(item, index) in emojiList"
            :key="index"
            @click="sendEmoji(item)"
          >
            <img :src="item" alt="" />
          </li>
        </ul>
      </div>
    </div>
    <div class="mask" @mousedown="closeEmoji"></div>
  </div>
</template>

<script setup>
import { reactive, defineEmits } from "vue";
const emit = defineEmits(["sendEmoji", "closeEmoji"]);
const emojiList = reactive([
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/smiling-face.png", import.meta.url).href,
  new URL(
    "../../assets/img/emoji/smiling-face-with-heart-eyes.png",
    import.meta.url
  ).href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
  new URL("../../assets/img/emoji/slightly-smiling-face.png", import.meta.url)
    .href,
]);

const sendEmoji = (item) => {
  emit("sendEmoji", item);
};

const closeEmoji = () => {
  emit("closeEmoji");
};
</script>

<style lang="scss" scoped>
.emoji-content {
  .emoji {
    width: 400px;
    height: 200px;
    @include getCssAttribute("background", "page_background_color");

    position: absolute;
    top: -220px;
    left: -10px;
    border-radius: 10px;
    transition: 0.3s;
    z-index: 3;

    &::after {
      content: "";
      display: block;
      width: 0;
      height: 0;
      border-top: 10px solid;
      @include getCssAttribute("border-top-color", "page_background_color");

      border-right: 10px solid transparent;
      border-left: 10px solid transparent;
      position: absolute;
      bottom: -8px;
      left: 15px;
      z-index: 100;
    }
    .emoji-wrapper {
      width: 100%;
      height: 100%;
      overflow-y: scroll;
      padding: 10px;
      box-sizing: border-box;
      position: relative;
      &::-webkit-scrollbar {
        /*滚动条整体样式*/
        width: 0px; /*高宽分别对应横竖滚动条的尺寸*/
        height: 0px;
        display: none;
      }
      &::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        display: none;
        // border-radius: 10px;
        // box-shadow: inset 0 0 5px rgba(97, 184, 179, 0.1);
        // background: rgb(95, 101, 122);
      }
      &::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        box-shadow: inset 0 0 5px rgba(87, 175, 187, 0.1);
        border-radius: 10px;
        background: rgb(39, 42, 55);
      }
      .emoji-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        margin-left: 10px;
        .emoji-item {
          list-style: none;
          width: 50px;
          height: 50px;
          border-radius: 10px;
          margin: 5px;
          position: relative;
          cursor: pointer;
          &:hover {
            @include getCssAttribute("background-color", "chat_background");
          }
          img {
            width: 35px;
            height: 35px;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
    }
  }
  .mask {
    width: 100%;
    height: 100%;
    position: fixed;
    background: transparent;
    left: 0;
    top: 0;
    z-index: 1;
  }
}
</style>
