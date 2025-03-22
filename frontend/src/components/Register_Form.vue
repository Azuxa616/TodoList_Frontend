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
    callback(new Error('用户名只能包含字母、数字和中文字符'))
  }
  callback()
}
const validateNickname = (rule:any, value:string, callback:any) => {
  if(!value.match(regex_username) && value.length > 0){
    callback(new Error('昵称只能包含字母、数字和中文字符'))
  }
  callback()
}

const validatePasswordCheck = (rule:any, value:string, callback:any) => {
  if(value!== form.password){
    callback(new Error('两次输入的密码不一致'))
  }
  callback()
}

const validateEmail = (rule:any, value:string, callback:any) => {
  if(!value.match(regex_email)){
    callback(new Error('请输入有效的邮箱地址'))
  }
  callback()
}

const validatePhone = (rule:any, value:string, callback:any) => {
  if(!value.match(regex_phone)){
    callback(new Error('请输入有效的手机号码'))
  }
  callback()
}
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {max:20, message: '用户名长度应在1-20个字符之间', trigger: 'blur' },
    { validator: validateUsername, trigger: 'blur' },
  ],
  nickname: [
    {max:20, message: '昵称长度不能超过20个字符', trigger: 'blur' },
    { validator: validateNickname, trigger: 'blur' },
  ],
  password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 6,max:20, message: '密码长度应在6-20个字符之间', trigger: 'blur' },
  ],
  confirmPassword: [
      { required: true, message: '请再次输入密码', trigger: 'blur' },
      { validator: validatePasswordCheck, trigger: 'blur' },
  ],
  gender: [
    {
      required: true, message: '请选择性别', trigger: 'change'
    }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' },
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
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
      <div class="title">用户注册</div>

      <!--用户名-->
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <!--昵称-->
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入昵称（选填）" />
      </el-form-item>

      <!--密码-->
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>

      <!--确认密码-->
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" show-password />
      </el-form-item>

      <!--性别-->
      <el-form-item label="性别" prop="gender">
        <el-segmented v-model="form.gender" :options="['男', '女']" />
      </el-form-item>

      <!--邮箱-->
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱地址" />
      </el-form-item>

      <!--手机号码-->
      <el-form-item label="手机号码" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号码" />
      </el-form-item>

      <!--签名-->
      <el-form-item label="个性签名" prop="signature">
        <el-input 
          v-model="form.signature" 
          type="textarea" 
          placeholder="请输入个性签名（选填）"
          :rows="3"
        />
      </el-form-item>

      <!--提交按钮-->
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)" class="signup-btn">
          注册
        </el-button>
      </el-form-item>
    </el-form>
    <div class="signup">
      已有账号？
      <router-link to="/login" class="login-link">立即登录</router-link>
    </div>
  </div>

</template>

<style scoped>

label {
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
}

input {
  border: none;
  border-bottom: 1px solid #898989;
  padding: 12px;
  width: 100%;
  transition: all 0.3s ease;
  position: relative; /* 为伪元素定位做准备 */
  border-radius: 4px;
}

.error {
  color: #f56c6c;
  font-size: 14px;
  margin-top: 5px;
}

input:focus {
  outline: none;
  border-bottom: 2px solid #14a8f1;
  box-shadow: 0 5px 15px rgba(20, 168, 241, 0.1);
}

:deep(.el-input__wrapper) {
  box-shadow: none !important;
  border-radius: 4px;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #14a8f1 !important;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #14a8f1 !important;
}

:deep(.el-form-item) {
  margin-bottom: 22px;
}

.title {
  font-size: 36px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 40px;
  color: #14a8f1;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  position: relative;
}

.title::after {
  content: "";
  position: absolute;
  width: 80px;
  height: 4px;
  background: linear-gradient(to right, #14a8f1, #00c2ff);
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 2px;
}

.RegisterForm {
  background: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 40px;
  margin: 50px auto;
  width: 500px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.RegisterForm:hover {
  box-shadow: 0 20px 45px rgba(0, 0, 0, 0.15);
  transform: translateY(-5px);
}

.signup-btn {
  margin: 30px auto;
  background: linear-gradient(135deg, #14a8f1, #00c2ff);
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 14px 24px;
  font-size: 18px;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  width: 100%;
  font-weight: 600;
  letter-spacing: 2px;
}

.signup-btn:hover {
  background: linear-gradient(135deg, #0b86c3, #00a8e6);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(20, 168, 241, 0.3);
}

:deep(.el-segmented) {
  --el-segmented-hover-bg-color: rgba(20, 168, 241, 0.1);
  --el-segmented-selected-bg-color: #14a8f1;
  --el-segmented-selected-text-color: white;
  --el-segmented-selected-hover-bg-color: #0b86c3;
}

.signup {
  font-size: 16px;
  text-align: center;
  margin-top: 20px;
  color: #606266;
}

.login-link {
  color: #14a8f1;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  position: relative;
  margin-left: 8px;
}

.login-link:hover {
  color: #0b86c3;
}

.login-link::after {
  content: "";
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -2px;
  left: 0;
  background: linear-gradient(to right, #14a8f1, #00c2ff);
  transition: width 0.3s ease;
}

.login-link:hover::after {
  width: 100%;
}

:deep(.el-textarea__inner) {
  border-radius: 4px;
  transition: all 0.3s ease;
  border: 1px solid #dcdfe6;
}

:deep(.el-textarea__inner:focus) {
  border-color: #14a8f1;
  box-shadow: 0 0 0 1px #14a8f1;
}
</style>