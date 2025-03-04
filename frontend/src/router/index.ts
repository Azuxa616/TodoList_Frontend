import {createRouter,createWebHistory} from 'vue-router'
import {unauthorized} from "@/net/index.js";
import {ElMessage} from "element-plus";
import {useAccountStore} from "@/stores/UserStore.ts";
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";

import LoginPage from "@/pages/VisitViews/LoginPage.vue";
import HomePage from "@/pages/HomeViews/HomePage.vue";
import MyAccountPage from "@/pages/HomeViews/MyAccountPage.vue";
import TodoListApp from "@/pages/HomeViews/TodoList_App.vue";
import RegisterPage from "@/pages/VisitViews/RegisterPage.vue";
import WelcomePage from "@/pages/HomeViews/WelcomePage.vue";
import AboutPage from "@/pages/HomeViews/AboutPage.vue";
import CategoriesPage from "@/pages/HomeViews/CategoriesPage.vue";


const router = createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/',
            redirect:'/login'
        },
        {
            name:'login',
            path:'/login',
            component:LoginPage

        },
        {
            name:'register',
            path:'/register',
            component:RegisterPage
        },
        {
            name:'index',
            path:'/home',
            component:HomePage,
            meta: { isAuth: true, title:'主页' },
            children: [
                {
                    name:'welcome',
                    path: '',
                    component:WelcomePage
                },
                {
                    name:'myAccount',
                    path: 'user',
                    component:MyAccountPage
                },
                {
                    name:'todoApp',
                    path: 'todo',
                    component:TodoListApp
                },
                {
                    name:'categoryManager',
                    path: 'categories',
                    component:CategoriesPage
                },
                {
                    name:'about',
                    path: 'about',
                    component:AboutPage
                }
                ]
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isUnauthorized = unauthorized()
    const UserStore = useAccountStore();
    if(to.fullPath.startsWith("/login")&&!isUnauthorized){
        console.log("已记住，直通主页")
        next("/home");
    }
    // else if(from.fullPath.startsWith("/login")&&!isUnauthorized){
    //     console.log("加载用户信息")
    //     UserStore.UserInfoInit()
    //     next();
    // }
    else if (!isUnauthorized) {
        console.log("授权通过")
        next()
    } else if (to.fullPath.startsWith('/home') && isUnauthorized) {
        console.log("未授权，跳转到登录页")
        next('/login')
        ElMessage.error("请先登录")
    } else {
        console.log("其他页面允许跳转")
        next()
    }
})

router.afterEach((to, from, next) => {
    const isUnauthorized = unauthorized()
    const UserStore = useAccountStore();
    const TodoItemStore = useTodoItemStore();
    if(to.fullPath.startsWith("/home")&&!isUnauthorized){
        console.log("加载用户信息")
        UserStore.UserInfoInit()
        setTimeout(()=>{
            console.log("加载分类信息")
            TodoItemStore.UserContentInit()
        },200)
        // console.log("加载任务信息")
        //  TodoItemStore.queryAll()

    }
})

export default router