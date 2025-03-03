<script lang="ts" setup>
import {RouterLink} from 'vue-router';
import {ref, watch, reactive} from 'vue';
import {defineComponent} from 'vue'
import {useRegisterFormStore} from "@/stores/FormStore/RegisterFormStore.ts";

import {storeToRefs} from 'pinia';
import type { ComponentSize, FormInstance, FormRules } from 'element-plus'

defineComponent({name: 'RegisterForm',})
const store = useRegisterFormStore();
const form = store.RegisterForm;

//正则表达式
const regex_username=/^[a-zA-Z0-9\u4e00-\u9fa5]+$/
const regex_password = /^[a-zA-Z0-9@_]+$/;
const regex_email = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const regex_phone = /^[1]([3-9])[0-9]{9}$/;

//
interface RuleForm {
  username: string;
  nickname: string;
  password: string;
  email: string;
  phone: string;
  confirmPassword: string;
  gender: string;
  signature: string;
}
const formSize = ref<ComponentSize>('default')

const ruleFormRef = ref<FormInstance>()

const genderOptions = ['Male','Female'];



const validateUsername = (rule:any, value:string, callback:any) => {
  if(!value.match(regex_username)){
    callback(new Error('Username should only contain Letters, Numbers and Chinese Characters.'))
  }
  callback()
}
const validateNickname = (rule:any, value:string, callback:any) => {
  if(!value.match(regex_username) && value.length > 0){
    callback(new Error('Username should only contain Letters, Numbers and Chinese Characters.'))
  }
  callback()
}

const validatePasswordCheck = (rule:any, value:string, callback:any) => {
  if(value!== form.password){
    callback(new Error('Two Passwords are Different.'))
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
    {max:20, message: 'Username length should between 1 and 20', trigger: 'blur' },
    { validator: validateUsername, trigger: 'blur' },
  ],
  nickname: [
    {max:20, message: 'Nickname length should less than 20', trigger: 'blur' },
    { validator: validateNickname, trigger: 'blur' },
  ],
  password: [
      { required: true, message: 'Please input Password', trigger: 'blur' },
      { min: 6,max:20, message: 'Password length should between 6 and 20', trigger: 'blur' },
  ],
  confirmPassword: [
      { required: true, message: 'Enter the Password again', trigger: 'blur' },
      { validator: validatePasswordCheck, trigger: 'blur' },
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

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      store.submit()
    } else {
      console.log('error submit!', fields)
    }
  })
}

</script>

<template>
  <div class="RegisterForm">
    <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="form"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
    >
      <div class="title">Sign Up</div>

<!--      用户名-->
      <el-form-item label="Username" prop="username">
        <el-input v-model="form.username" />
      </el-form-item>
      <!--昵称-->
      <el-form-item label="Nickname" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>

<!--      密码-->
      <el-form-item label="Password" prop="password">
        <el-input v-model="form.password"  type="password"/>
      </el-form-item>

<!--      确认密码-->
      <el-form-item label="Confirm Password" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" />
      </el-form-item>

<!--      性别-->
      <el-form-item label="Gender" prop="gender">
        <el-segmented v-model="form.gender" :options="genderOptions" />
      </el-form-item>

<!--      邮箱-->
      <el-form-item label="Email" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>

<!--      手机号码-->
      <el-form-item label="Phone Number" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>

<!--      签名-->
      <el-form-item label="Signature" prop="signature">
        <el-input v-model="form.signature" type="textarea" />
      </el-form-item>

<!--      提交按钮-->
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Sign Up
        </el-button>
      </el-form-item>
    </el-form>
    <div class="signup"> Already have an account?
      <router-link to="/login">Login now</router-link>
    </div>
  </div>

</template>

<style scoped>

label {
  font-weight: bold;
  margin-bottom: 10px;
  font-size: 16px;
}

input {
  border: none;
  border-bottom: 1px solid #898989;
  padding: 10px;
  width: 100%;
  transition: color 2s;
  position: relative; /* 为伪元素定位做准备 */

}

.error {
  color: red;
  font-size: 14px;
  margin-top: 5px;
}

input:focus {
  outline: none;
  border-bottom: 2px solid #14a8f1;
}

.title {
  font-size: 30px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.RegisterForm {
  background: #ffffff;
  border: 1px solid black;
  border-radius: 15px;
  padding: 20px;
  margin: 50px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 5px 5px 10px gray;
}

button {
  margin: 20px auto;
  background-color: #14a8f1;
  color: #ffffff;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 100%;
}

button:hover {
  background-color: #8ecbec;
  cursor: pointer;
}

.signup {
  font-size: 18px;
  text-align: left;
}
</style>