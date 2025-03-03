import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import {login} from '@/net/index.ts'
import router from "@/router";
import {useAccountStore} from "@/stores/UserStore.ts"




export const useLoginFormStore = defineStore('loginForm', () => {
    const UserStore=useAccountStore()

    const LoginForm = reactive({
        username: '',
        password: '',
        rememberMe: false
    })

    function submit(){
        login(LoginForm.username,LoginForm.password, LoginForm.rememberMe, () => {
            ElMessage.success('登录成功,准备跳转')
            UserStore.UserInfoInit()
            setTimeout(() => {
                router.push({path:'/home'})
            },1000)
        })
    }
    return {LoginForm,submit}
})