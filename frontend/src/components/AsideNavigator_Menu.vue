<script setup lang="ts">
  import { ref } from 'vue'
  import router from '@/router'
  import {
    Document,
    Menu as IconMenu,
    Location,
    Setting, InfoFilled, Grid, HomeFilled,
  } from '@element-plus/icons-vue'
  import { useAccountStore } from "@/stores/UserStore.ts";
  import {storeToRefs} from "pinia";

  const InfoStore = useAccountStore()
  const userInfo = storeToRefs(InfoStore).UserInfo


  const isCollapse = ref(true)
  const handleMouseEnter = () => {
    isCollapse.value = false
  }
  const handleMouseLeave = () => {
    isCollapse.value =true
  }
  const handleSelect = (index: string) => {
    if (index === '2') {
      router.push('/home')
    }else if (index === '3') {
      router.push('/home/todo')
    }else if (index === '4') {
      router.push('/home/categories')
    }else if (index === '5') {
      router.push('/home/user')
    }else if (index === '6') {
      router.push('/home/about')
    }
  }
</script>

<template>
  <div class="navi">
    <el-menu
        default-active="2"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
        @mouseenter="handleMouseEnter"
        @mouseleave="handleMouseLeave"
        @select="handleSelect"
    >
      <div class="avatar-container">
        <el-menu-item index="0" class="side-info">
          <el-avatar
              :src="userInfo.avatarUrl"
              size="large"
              class="user-avatar"
              v-if="!isCollapse"
          />
          <template #title>
              <span class="user-nickname">{{userInfo.nickname}}</span>
          </template>
        </el-menu-item>
      </div>
      
      <el-divider class="menu-divider"></el-divider>
      
      <el-menu-item index="1" class="side-signature" >
        <template #title>
          <div class="signature-container">
            <el-input
                type="textarea"
                class="signature-textarea"
                id="signature-textarea"
                v-model="userInfo.signature"
                resize="none"
                autosize
                readonly
                disabled
                >{{userInfo.signature}}</el-input>
          </div>
        </template>
      </el-menu-item >
      
      <el-divider class="menu-divider"></el-divider>
      
      <el-menu-item index="2" class="navi-item">
        <el-icon class="menu-icon"><HomeFilled /></el-icon>
        <template #title><span class="navi-title">首页</span></template>
      </el-menu-item>
      
      <el-menu-item index="3" class="navi-item">
        <el-icon class="menu-icon"><document /></el-icon>
        <template #title><span class="navi-title">我的待办</span></template>
      </el-menu-item>
      
      <el-menu-item index="4" class="navi-item">
        <el-icon class="menu-icon"><Grid /></el-icon>
        <template #title><span class="navi-title">分类管理</span></template>
      </el-menu-item>
      
      <el-menu-item index="5" class="navi-item">
        <el-icon class="menu-icon"><setting /></el-icon>
        <template #title><span class="navi-title">个人信息</span></template>
      </el-menu-item>
      
      <el-menu-item index="6" class="navi-item">
        <el-icon class="menu-icon"><InfoFilled /></el-icon>
        <template #title><span class="navi-title">关于</span></template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
.navi{
  font-size: 16px;
  height: 100%;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 240px;
  min-height: 400px;
  transition: width 0.3s ease;
}

.el-menu-vertical-demo{
  width: 80px;
  height: 100%;
  border-right: none;
  transition: width 0.3s ease;
  background: transparent;
}

:deep(.el-menu--collapse) {
  width: 80px;
}

.avatar-container {
  padding: 15px 0;
  display: flex;
  justify-content: center;
}

.side-info{
  height: auto;
  font-size: 18px;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 10px;
}

.user-avatar {
  margin: 10px auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  border: 3px solid rgba(255, 255, 255, 0.2);
}

.user-avatar:hover {
  transform: scale(1.1);
  border: 3px solid rgba(255, 255, 255, 0.4);
}

.user-nickname {
  font-size: 20px; 
  font-weight: bold; 
  margin-top: 8px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
}

.side-signature{
  height: auto;
  padding: 0 10px;
}

.signature-container {
  width: 100%;
  padding: 0 5px;
}

.signature-textarea {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}

:deep(.signature-textarea .el-textarea__inner) {
  background-color: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
  padding: 0;
}

.menu-divider {
  margin: 5px 0;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

:deep(.el-divider__text) {
  background-color: transparent;
}

.navi-item {
  margin: 8px 0;
  height: 60px;
  border-radius: 8px;
  margin-left: 6px;
  margin-right: 6px;
  transition: all 0.3s ease;
}

:deep(.navi-item.is-active) {
  background: linear-gradient(to right, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.2));
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.navi-item:hover {
  background: rgba(255, 255, 255, 0.1);
  transform: translateX(5px);
}

.menu-icon {
  font-size: 24px;
  color: rgba(255, 255, 255, 0.9);
  margin-right: 10px;
  transition: all 0.3s ease;
}

.navi-title {
  font-size: 16px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
}

:deep(.el-menu-item) {
  color: rgba(255, 255, 255, 0.7);
}

:deep(.el-menu-item:hover) {
  color: white;
}

:deep(.el-menu-item.is-active) {
  color: white;
}

:deep(.el-menu-item.is-active .menu-icon) {
  color: white;
}
</style>