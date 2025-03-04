import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import {getUserInfo, deleteAccessToken, fetchTasks, fetchCategories,} from "@/net";
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
import {ElMessage} from "element-plus";
import router from "@/router";



export const useAccountStore = defineStore('userStore', () => {
    const isLoaded = ref(false);
    const UserInfo = reactive({
        avatarUrl: '../src/assets/img/TestAvatar.png',
        nickname: '',
        username: '',
        password: '',
        uid:'',
        email: '',
        phone: '',
        gender: '',
        signature: '',
    })
    // const UserContent=reactive({
    //     categories:[
    //         // {
    //         //     id:'1894633242174734338',
    //         //     name:'Category01',
    //         // },
    //         // {
    //         //     id:'1894670847931105281',
    //         //     name:'Category02',
    //         // },
    //         // {
    //         //     id:'1894647966497030145',
    //         //     name:'Category03',
    //         // },
    //     ] as Array<CategoryInterface>,
    // })
    const UserInfoInit=()=>{
        console.log("UserInfoInit")
        getUserInfo(
            (response:any)=>{
                console.info("UserInfo Init Successfully")
                UserInfo.uid = response.id
                UserInfo.nickname = response.nickName
                UserInfo.username = response.name
                UserInfo.email = response.email
                UserInfo.phone = response.phone
                if(response.sex==1){
                    UserInfo.gender = 'male'
                }else if(response.sex==2){
                    UserInfo.gender = 'female'
                }
                UserInfo.signature = response.signature
                console.info("UserInfoLoaded",UserInfo)
                isLoaded.value = true;
            },
            ()=>{
                ElMessage.error("未登录或凭证已过期，请重新登录")
                deleteAccessToken()
                router.push('/login')
                isLoaded.value = false
            }

        )
    }
    // const UserContentInit=()=>{
    //     const TodoStore=useTodoItemStore()
    //     const CategoriesMap= TodoStore.CategoriesMap
    //     fetchCategories((response:any)=>{
    //         console.info("UserContentInit")
    //
    //         UserContent.categories=response;
    //         console.log(UserContent.categories)
    //         TodoStore.InitMap()
    //         console.log("***",TodoStore.CategoriesMap)
    //
    //         for(const item of UserContent.categories){
    //             item.containedNum = CategoriesMap.get(item.name)
    //             console.log(CategoriesMap)
    //         }
    //         console.info("!%%!%!",UserContent.categories)
    //     },()=>{
    //         ElMessage.error("获取分类失败")
    //     })
    //
    // }
    return { isLoaded,UserInfo ,UserInfoInit}
})
