<script setup lang="ts">
//todo: 样式更新
import {Star, StarFilled} from "@element-plus/icons-vue";
</script>

<template>

  <h1>About</h1>

    <el-divider  >
      <div class="divider">
      <el-icon><star /></el-icon>
      <span >  感谢使用  </span>
      <el-icon><star/></el-icon>
    </div>
    </el-divider>



<!--  <img id="fire-gif" src="@/assets/img/Firefixed.gif">-->
  <div class="container">


      <div class="detail">
        这是一个前后端分离的 TodoList Web 应用<br>
        前端使用 <span  class="sub-span">Vue3</span> + <span class="sub-span">Vite2</span> +  <span class="sub-span">TypeScript</span> + <span class="sub-span">Element-Plus</span> 开发
      </div>
      前端仓库地址：
      <a href="https://github.com/Azuxa616/TodoList_Frontend" target="_blank">Github</a>
      Author: <a href="https://github.com/Azuxa616" target="_blank">@Azuxa616</a>
      <br>
      后端仓库地址：
      <a href="https://github.com/LunaY77/TodoList " target="_blank">Github</a>
      Author: <a href="https://github.com/LunaY77" target="_blank">@LunaY77</a>


  </div>
  <img id="fire-gif" src="@/assets/img/Firefixed.gif">
</template>

<style scoped>
.divider{
  color: #999;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
  font-size: 30px;
}
#fire-gif {
  width: 20%;
  margin-left: 40%;
  margin-top: 5%;
}
.container {
  margin-top: 5%;
  margin-left: 5%;
  margin-right: 5%;
  padding: 10px;
  border: 2px solid #eee;
  background-color: rgba(196, 245, 213, 0.58);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}
.detail {
  font-size: 20px;
}
.sub-span {
 font-weight: bold;
}
h1 {
  color: rgba(61, 61, 63, 0.6);
  text-align: center;
  font-size: 4rem;
  margin-bottom: 1rem;
}
#span{
  color: #444;
  font-size: 2.5rem;
  font-weight: 1000;
  text-align: center;

}
</style>