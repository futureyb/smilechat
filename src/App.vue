<template>
    <div>
        <nav>
            <router-link to="/"></router-link>
        </nav>
        <router-view></router-view>
      
    </div>
</template>
<script setup>
  
  import lazy from "./components/lazyImg/lazyImg.vue"

    
</script>

<style lang="scss">
@import url("./assets/font/iconfont.scss");



.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>


