<template>
  <el-calendar v-model="value" size="mini" class="calendar"/>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(new Date())
</script>

<style scoped>
  .calendar {
      
      margin: 5% auto;
      min-width:800px;
      max-width:800px;
      background-color: rgba(255, 228, 186, 0.1);
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.23);
  }
</style>