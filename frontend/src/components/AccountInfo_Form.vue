<template>
  <div class="AccountInfo">
  <el-form
           ref="ruleFormRef"
           :model="form"
           :rules="rules"
           label-width="auto"
           style="min-width: 600px"
           size="large"
           v-loading="!isInfoLoaded"
           status-icon
           id="account-form">

    <el-form-item  id="account-info" >
      <!--头像-->
      <img class="avatar" :src="form.avatarUrl" alt="avatar" />

      <div class="info-show-box">
        <el-form-item id="show-username" >
            <span class="nickname">{{(Info.nickname==null)?form.username:Info.nickname}}</span>
        </el-form-item>
        <!--账号id-->
        <el-form-item id="show-uid" ><span class="uid" >UID:{{Info.uid}}</span> </el-form-item>
      </div>
    </el-form-item>

    <!--用户名-->
    <el-form-item label="Username:" prop="username">
<!--      <el-input class="username" v-model="form.username"></el-input>-->
      <span class="username">{{form.username}} </span>
    </el-form-item>
<!--昵称-->
    <el-form-item label="Nickname:" prop="nickname">
      <el-input v-model="form.nickname" />
    </el-form-item>
<!--邮箱-->
    <el-form-item label="Email:" prop="email">
      <el-input v-model="form.email" />
    </el-form-item>

<!--    电话号码-->
    <el-form-item label="Phone Number:" prop="phone">
      <el-input v-model="form.phone" />
    </el-form-item>
<!--    性别-->
    <el-form-item label="Gender:" prop="gender">
      <el-radio-group v-model="form.gender">
        <el-radio-button value="male">Male</el-radio-button>
        <el-radio-button value="female">Female</el-radio-button>
      </el-radio-group>
    </el-form-item>
<!--    个签-->
    <el-form-item label="Signature:">
      <el-input v-model="form.signature" type="textarea" />
    </el-form-item>

    <div>
      <div>
        <el-button id="save-btn" type="success" @click="onSubmit(ruleFormRef)">Save</el-button>
      </div>
      <div class="Btn-group">
        <ChangePassword_Dialog id="change-password-btn" />
        <el-button @click="onCancel" id="cancel-btn">Reset</el-button>
      </div>
      <div>
        <el-button id="save-btn" type="danger" @click="onExit">Logout</el-button>
      </div>
    </div>
  </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, onMounted, ref, watch} from 'vue'
import router from '@/router/index.ts'
import {logout} from "@/net";
import {storeToRefs} from 'pinia'
import ChangePassword_Dialog from "@/components/ChangePassword_Dialog.vue";
import {useAccountStore} from "@/stores/UserStore.ts";
import {useAccountFormStore} from "@/stores/FormStore/AccountFormStore.ts";
import {ElMessage, type FormInstance, type FormRules} from "element-plus";
const formStore = useAccountFormStore()
const form=storeToRefs(formStore).AccountForm;
const Info=storeToRefs(useAccountStore()).UserInfo.value;
const ruleFormRef = ref<FormInstance>()

// let loading=true;
const isInfoLoaded=storeToRefs(useAccountStore()).isLoaded
watch(isInfoLoaded,(newVal)=>{formStore.FormInit()})
// const loading =isInfoLoaded.value;

interface RuleForm {
  username: string;
  nickname: string;
  email: string;
  phone: string;
  gender: string;
  signature: string;
}

const regex_username=/^[a-zA-Z0-9\u4e00-\u9fa5]+$/
const regex_password = /^[a-zA-Z0-9@_]+$/;
const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regex_phone = /^[1]([3-9])[0-9]{9}$/;




const validateUsername = (rule:any, value:string, callback:any) => {
  if(!value.match(regex_username)){
    callback(new Error('Username should only contain Letters, Numbers and Chinese Characters.'))
  }
  callback()
}

const validateNickname = (rule:any, value:string, callback:any) => {
  //username和nickname共用一个正则表达式
  if(!value.match(regex_username)){
    callback(new Error('Nickname should only contain Letters, Numbers and Chinese Characters.'))
  }
  callback()
}

const validateEmail = (rule:any, value:string, callback:any) => {
  if(!value.match(regex_email)){
    callback(new Error('Invalid Email Address.'))
  }
  callback()
}

const validatePhone = (rule:any, value:string, callback:any) => {
  if(!value.match(regex_phone)){
    callback(new Error('Invalid Phone Number.'))
  }
  callback()
}
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: 'Please input Username', trigger: 'blur' },
    { validator: validateUsername, trigger: 'blur' },
  ],
  nickname: [
    { validator: validateNickname, trigger: 'blur' },
  ],
  gender: [
    {
      required: true, message: 'Please select Gender', trigger: 'change'
    }
  ],
  email: [
    { required: true, message: 'Please input Email', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' },
  ],
  phone: [
    { required: true, message: 'Please input Phone Number', trigger: 'blur' },
    { validator: validatePhone, trigger: 'blur' }
  ],
})

onMounted(() => {
  setTimeout(()=>{
    formStore.FormInit()
  },100)
})


const onSubmit = async(formEL:FormInstance | undefined) => {
  if(!formEL) return
  await formEL.validate( (valid,fields) => {
    if(valid){
      console.log('submit!')
      formStore.FormSubmit()
    }else{
      console.log('error submit!',fields)
    }
  })

}
const onCancel = () => {
  formStore.FormInit()
  //todo:取消操作
}
const onExit = () => {
  logout(
      ()=>{
        ElMessage.success('退出登录成功，欢迎您再次使用')
        setTimeout(()=>{
          router.push('/login')
        },500)
      }
  )
}
</script>
<style scoped>
.Btn-group {
  display:flex;
  justify-content: space-evenly;
  margin-top: 20px;
  margin-bottom: 20px;
}
#cancel-btn{
  width: 200px;
}
#change-password-btn{
  width: 200px;
}
#save-btn{
  width: 80%;
  margin-left: 10%;
}
.info-show-box {
  display: flex;
  flex-direction: column;
  margin-top: 20px;
}
.AccountInfo {
  contain: layout;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

}
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-top: 20px;
  margin-bottom: 20px;
}
.nickname {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-left: 20px
}
.uid{
  margin-left: 20px
}
#account-form{
  margin-top: 20px;
  background-color: rgba(255, 239, 209, 0.24);
  padding: 20px;
}
</style>