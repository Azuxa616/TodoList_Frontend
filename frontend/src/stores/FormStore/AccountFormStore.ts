import { ref, reactive } from 'vue'
import {defineStore, storeToRefs} from 'pinia'
import {useAccountStore} from '@/stores/UserStore'
import {infoSubmit} from "@/net";
import {ElMessage} from "element-plus";


export const useAccountFormStore = defineStore('accountForm', () => {
    const isLoaded =useAccountStore().isLoaded

    const AccountForm = reactive({
        avatarUrl: '',
        nickname: '',
        username: '',
        email: '',
        phone: '',
        gender: '',
        signature: '',
    })
    const FormInit = () => {
        const store = useAccountStore().UserInfo
        AccountForm.avatarUrl = store.avatarUrl
        AccountForm.username = store.username
        AccountForm.nickname = (store.nickname==null) ? store.username : store.nickname
        AccountForm.email = store.email
        AccountForm.phone = store.phone
        AccountForm.gender = store.gender
        AccountForm.signature = store.signature
    }
    const FormSubmit = () => {
        const store = useAccountStore()
        let sex:number =(AccountForm.gender==='male')?1:2
        infoSubmit(
            AccountForm.nickname,
            sex,
            AccountForm.email,
            AccountForm.phone,
            AccountForm.signature,
            (response:any) => {
                console.log("InfoSubmit Success")
                ElMessage.success("修改成功")
                store.UserInfoInit()
                setTimeout(() => {
                    console.log("Form Reflash")
                    FormInit()
                },1000)
            },
            (message: string, code: number, url: string) => {
                console.log("InfoSubmit Fail")
                ElMessage.error("修改失败")
            }
        )
    }
    return { isLoaded,AccountForm ,FormInit ,FormSubmit}
})
