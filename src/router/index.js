import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";


//路由数组
const routes = [
    {
        //基本格式
        path: "/",
        name: "login",
        component: () => import("../views/login/login.vue")
    },
    {
        //基本格式
        path: "/home",
        name: "home",
        component: () => import("../views/home/home.vue")
    },
    {
        path: "/addFriends",
        name: "addFriends",
        component: () => import("../views/addFriends/addFriends.vue")
    },
    {
        //基本格式
        path: "/test",
        name: "test",
        component: () => import("../views/test/test.vue")
    }

];



//路由对象
const router = createRouter({
    history: createWebHashHistory(),
    routes, //上面的路由数组
});




//导出路由对象，在main.js中引用
export default router;
