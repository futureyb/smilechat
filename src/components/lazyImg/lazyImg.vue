<template>
  <div class="lazy-img-box">
    <img class="lazy-img" :data-src="props.src"  v-lazy />
  </div>
</template>

<script setup>
import { onMounted } from "vue";
let  props = defineProps({
  src: {
    type: String,
    default: "",
  },
  alt: {
    type: String,
    default: "",
  },
  isLazy:{
    type:Boolean,
    default:true
  }
});


const vLazy  = {
    mounted(el,bind) {
        //判断是否需要懒加载
        if(!props.isLazy) return el.src = el.dataset.src
        // console.log(el,bind.value)
        console.log(el.dataset)
        const obServer = new IntersectionObserver(entris=>{
            if(entris[0].intersectionRatio <= 0)return 
            el.src = el.dataset.src
            obServer.unobserve(el)
        })
        obServer.observe(el)
    },
}

onMounted(() => {
})
</script>

<style lang="scss" scoped>


.lazy-img-box{
    overflow: hidden;
}

.lazy-img{
    width: 100%;
    height: 100%;
}
</style>