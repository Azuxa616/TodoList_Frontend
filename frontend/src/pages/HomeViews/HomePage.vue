<script setup lang="ts">
  import router from "@/router";
  import AsideNavigator_Menu from "@/components/AsideNavigator_Menu.vue";

</script>

<template>
  <div class="home-page">
    <el-header class="header">
      <div class="Head_InFo">
        <button class="logo" @click="router.push('/home')">
          MYTODOLIST
        </button>
      </div>
    </el-header>
    <el-container class="content">
      <el-aside width="auto">
        <div class="aside-box" >
          <AsideNavigator_Menu  />
        </div>
      </el-aside>
      <el-container>
        <el-main class="main">
          <div class="main-box">
            <RouterView />
          </div>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<style scoped>
.header {
  padding: 0;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
  position: relative;
}
.content {
  height: 92%;
  width: 92%;
  padding-top: 1.5%;
  margin: 0 auto;
  border-radius: 10px;
  overflow: hidden;
}
.main{
  padding: 10px 20px;
  background: #ffffff;
  height: 100%;
  border-radius: 0 10px 10px 0;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}
.aside-box {
  height: 100%;
  width: 100%;
  background: linear-gradient(to bottom, #464646, #2d2d2d);
  border-radius: 10px 0 0 10px;
  transition: all 0.3s ease;
}
.logo {
  font-size: 28px;
  font-weight: bold;
  color: #333333;
  margin-left: 20px;
  cursor: pointer;
  background: none;
  border: none;
  position: relative;
  transition: all 0.3s ease;
  letter-spacing: 1px;
  text-transform: uppercase;
}

.logo:hover {
  color: #14a8f1;
  transform: scale(1.05);
}

.logo::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 0;
  background-color: #14a8f1;
  transition: width 0.3s ease;
}

.logo:hover::after {
  width: 100%;
}

.el-button+.el-button {
  margin: 5px 0;
  height: 15px;
}

el-header {
  position: relative;
  height: 8%;
  background: linear-gradient(to right, #f8f3e5, #f5e9da);
}

.Head_InFo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 100%;
  background: linear-gradient(to right, #f8f3e5, #f5e9da);
}

.main-box{
  height: 99%;
  padding: 10px;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.info-show span{
  font-size: 25px;
}

.home-page{
  height: 100vh;
  background: linear-gradient(to bottom, #f0f2f5, #e6e9f0);
}
</style>