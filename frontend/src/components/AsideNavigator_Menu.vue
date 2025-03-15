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
      <el-menu-item index="0" class="side-info">

        <el-avatar
            :src="userInfo.avatarUrl"
            size="large"
        />
        <template #title>
            <span style="font-size:25px; font-weight: bold; margin-left: 10px;">{{userInfo.nickname}}</span>
        </template>
      </el-menu-item>
      <el-divider #title></el-divider>
      <el-menu-item index="1" class="side-signature" >
        <template #title  >
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
        </template>
      </el-menu-item >
      <el-divider #title></el-divider>
      <el-menu-item index="2" class="navi-item">
        <el-icon  :size="40"><HomeFilled /></el-icon>
        <template #title class="side-title" ><span class="navi-title">Home</span></template>
      </el-menu-item>
      <el-menu-item index="3" class="navi-item">
        <el-icon :size="40"><document /></el-icon>
        <template #title class="side-title"><span class="navi-title">My TodoList</span>></template>
      </el-menu-item>
      <el-menu-item index="4" class="navi-item">
        <el-icon :size="40"><Grid /></el-icon>
        <template #title class="side-title"><span class="navi-title">Categories</span>></template>
      </el-menu-item>
      <el-menu-item index="5" class="navi-item">
        <el-icon :size="40"><setting /></el-icon>
        <template #title class="side-title"><span class="navi-title">Profile</span>></template>
      </el-menu-item>
      <el-menu-item index="6" class="navi-item">
        <el-icon :size="40"><InfoFilled /></el-icon>
        <template #title class="side-title"><span class="navi-title">About</span></template>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style scoped>
      .signature-textarea {
        font-size: 18px; /* 你可以根据需要调整这个值 */
      }
      .el-menu-item{
        font-size: 20px;
      }
      .navi{
        font-size: 18px;
      }

      .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 300px;
        min-height: 400px;
      }

      .el-menu-vertical-demo{
        width: 100px;
      }
      .side-info{
        height: 100px;
        font-size: 20px;
      }
      .side-signature{
        height: auto;
      }
      .side-title{
        font-size: 20px;
        font-weight: bold;
      }
</style>