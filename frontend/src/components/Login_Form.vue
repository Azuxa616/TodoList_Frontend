  <script setup lang="ts">
    import { RouterLink} from 'vue-router'
    import {defineComponent} from 'vue'
    import {login} from '@/net/index.ts'
    import router from '../router/index'
    import {storeToRefs} from 'pinia'
    import {useLoginFormStore} from '@/stores/FormStore/LoginFromStore.ts'
    defineComponent({name: 'LoginForm'})

    const loginFormStore = useLoginFormStore()
    const form=storeToRefs(loginFormStore).LoginForm.value


    function onSubmit() {
      loginFormStore.submit()
    }

  </script>

  <template>
    <div class="login-form">
      <div class="title">登录</div>
      <form @submit.prevent="onSubmit">
        <div class="form-group">
          <div class="form-item">
            <label for="username">用户名</label>
            <input type="text" id="username" v-model="form.username" required placeholder="请输入用户名" class="input-field" />
          </div>

          <div class="form-item">
            <label for="password">密码</label>
            <input type="password" id="password" v-model="form.password" required placeholder="请输入密码" class="input-field"/>
          </div>
        </div>

        <div class="checkbox-group">
          <input type="checkbox" v-model="form.rememberMe" id="remember" class="remember-checkbox" />
          <label for="remember" class="remember-label">记住我</label>
        </div>
        
        <button type="submit" v-loading="loginFormStore.LoadingActive" class="login-btn">登录</button>
        
        <div class="signup">
          还没有账号？ <router-link to="/register" class="signup-link">立即注册</router-link>
        </div>
      </form>
    </div>
  </template>
  
  <style scoped>
    .login-form {
      background: #ffffff;
      border: none;
      border-radius: 15px;
      padding: 30px;
      margin: 50px auto;
      width: 400px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }
    
    .login-form:hover {
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
      transform: translateY(-5px);
    }
    
    .title {
      font-size: 32px;
      font-weight: bold;
      text-align: center;
      margin-bottom: 30px;
      color: #14a8f1;
      text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
      position: relative;
    }
    
    .title::after {
      content: "";
      position: absolute;
      width: 60px;
      height: 3px;
      background-color: #14a8f1;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      border-radius: 2px;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    .form-item {
      margin-bottom: 20px;
    }
    
    label {
      font-weight: 600;
      display: block;
      margin-bottom: 8px;
      font-size: 16px;
      color: #333;
    }
    
    .input-field {
      border: none;
      border-bottom: 1px solid #898989;
      padding: 12px;
      width: 100%;
      transition: all 0.3s ease;
      position: relative;
      border-radius: 4px;
      background-color: #f9f9f9;
    }
    
    .input-field:focus {
      outline: none;
      border-bottom: 2px solid #14a8f1;
      box-shadow: 0 5px 15px rgba(20, 168, 241, 0.1);
      background-color: #fff;
    }
    
    .checkbox-group {
      display: flex;
      align-items: center;
      margin-bottom: 20px;
    }
    
    .remember-checkbox {
      width: 18px;
      height: 18px;
      margin-right: 10px;
      accent-color: #14a8f1;
      cursor: pointer;
    }
    
    .remember-label {
      font-weight: 500;
      font-size: 14px;
      color: #666;
      margin: 0;
      cursor: pointer;
    }
    
    .login-btn {
      margin: 10px 0 20px;
      background: linear-gradient(to right, #14a8f1, #00c2ff);
      color: #ffffff;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 16px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;
      width: 100%;
      font-weight: 600;
      letter-spacing: 1px;
    }
    
    .login-btn:hover {
      background: linear-gradient(to right, #0b86c3, #00a8e6);
      transform: translateY(-2px);
      box-shadow: 0 5px 15px rgba(20, 168, 241, 0.3);
    }
    
    .signup {
      font-size: 16px;
      text-align: center;
      margin-top: 15px;
      color: #606266;
    }
    
    .signup-link {
      color: #14a8f1;
      font-weight: 600;
      text-decoration: none;
      transition: all 0.3s ease;
      position: relative;
    }
    
    .signup-link:hover {
      color: #0b86c3;
    }
    
    .signup-link::after {
      content: "";
      position: absolute;
      width: 0;
      height: 2px;
      bottom: -2px;
      left: 0;
      background-color: #0b86c3;
      transition: width 0.3s ease;
    }
    
    .signup-link:hover::after {
      width: 100%;
    }
  </style>