<script setup lang="ts">


  import LoginPage from '@/pages/VisitViews/LoginPage.vue'
  import {RouterView,useRouter} from 'vue-router'
</script>

<template>
  <div class="app">
    <RouterView />
  </div>
</template>

<style scoped>
  .app {
    width: 100%;
    height:100%;
    margin: 0;
    top: 0;
    }
</style>
