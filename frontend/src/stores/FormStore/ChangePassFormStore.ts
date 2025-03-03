import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import {changePassword} from '@/net/index.ts'
import {ElMessage} from "element-plus";
export const useChangePassFormStore = defineStore('changePassFormStore', () => {
    const Form = reactive({
        pass_pre:'',
        pass_new:'',
        pass_check:''
    })
    const submitPass = () => {
        changePassword(Form.pass_new,
            () => {
            console.log('修改密码成功')
            ElMessage.success('修改密码成功')
        },() => {
            console.log('修改密码失败')
            ElMessage.error('修改密码失败')
        })
    }

    return {Form, submitPass}
})