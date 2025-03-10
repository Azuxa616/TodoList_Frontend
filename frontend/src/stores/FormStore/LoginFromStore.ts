import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import {login} from '@/net/index.ts'
import router from "@/router";
import {useAccountStore} from "@/stores/UserStore.ts"
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";


export const useLoginFormStore = defineStore('loginForm', () => {
    const UserStore=useAccountStore()
    const TodoStore = useTodoItemStore()

    const LoadingActive = ref(false)

    const LoginForm = reactive({
        username: '',
        password: '',
        rememberMe: false
    })

    function submit(){
        LoadingActive.value = true
        login(LoginForm.username,LoginForm.password, LoginForm.rememberMe, () => {
            ElMessage.success('登录成功,准备跳转')
            setTimeout(() => {
                setTimeout(()=>{
                    UserStore.UserInfoInit()
                    TodoStore.UserContentInit()
                },400)
                LoadingActive.value = false
                formReset()
                router.push('/home')
            },100)
        },()=>{
            formReset()
        })
    }
    function  formReset(){
        LoadingActive.value = false
        LoginForm.username = ''
        LoginForm.password = ''
        LoginForm.rememberMe = false
    }
    return {LoginForm,LoadingActive,submit}
})