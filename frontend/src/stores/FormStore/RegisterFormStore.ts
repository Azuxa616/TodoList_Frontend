import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import {register} from "@/net";
import { ElMessage } from "element-plus";
import router from "@/router";

export const useRegisterFormStore = defineStore('registerForm', () => {
    const RegisterForm = reactive({
        username: '',
        nickname: '',
        password: '',
        confirmPassword: '',
        gender:'',
        email: '',
        phone: '',
        signature: ''
    })
    const submit = () => {
        const sex = (RegisterForm.gender === 'Male') ? 1 : 2
        register(
            RegisterForm.username,
            RegisterForm.nickname,
            RegisterForm.password,
            sex,
            RegisterForm.email,
            RegisterForm.phone,
            RegisterForm.signature,
            (response:any) => {
                console.log('register success!')
                ElMessage.success(`注册成功!`)
                setTimeout(() => {
                    console.log('跳转')
                    router.push('/login')
                },500)
        })
    }

    return {RegisterForm,submit}
})