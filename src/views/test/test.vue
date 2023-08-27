<template>
    <div>
        <label for="theme-select">选择主题：</label>
        <select id="theme-select" v-model="selectedTheme" @change="applyTheme">
    
            <option value="dark">浅色主题</option>
            <option value="light">深色主题</option>
        </select>

        <div class="ivu-layout-header">1231231</div>
    </div>
</template>

<script>

export default {
    data() {
        return {
        
        };
    },
    methods: {
        applyTheme(e) {
            let val = e.target.value;
            window.document.documentElement.setAttribute("data-theme", val);
        },
    },
};
</script>

<style lang="scss">
// @import "../../thems/_handel.scss";
.ivu-layout-header{
    @include getCssAttribute("color","font_color1");
    @include getCssAttribute("background","background_color3");
    // @include getCssAttribute("background","background_color3");
}
</style>
