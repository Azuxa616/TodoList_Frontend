import { ref, reactive } from 'vue'
import { defineStore } from 'pinia'
import {getUserInfo ,deleteAccessToken} from "@/net";
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
    const UserContent=reactive({
        categories:[
            {
                index:1,
                name:'Category01',
            },
            {
                index:2,
                name:'Category02',
            },
            {
                index:3,
                name:'Category03',
            },
        ]
    })
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
    const UserContentInit=()=>{
        console.log("UserContentInit")
    //TODO: 需要获取分类api
    }
    return { isLoaded,UserInfo ,UserContent ,UserInfoInit}
})
