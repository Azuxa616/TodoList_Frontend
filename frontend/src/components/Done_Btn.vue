<script setup lang="ts">
import {ref} from "vue";
import {Finished, Select} from "@element-plus/icons-vue";

const isDone = defineModel()
  const type =ref(isDone.value ?'success':'primary')
  const icon =ref(isDone.value ?Select:Finished)
  const DoneStr =ref(isDone.value ?'': 'Done');
  const DoneClick = () => {

    isDone.value = !isDone.value;
    setTimeout(() => {
      icon.value = isDone.value ?  Select:Finished ;
      DoneStr.value = isDone.value ? '': 'Done'
      type.value = isDone.value ? 'success':'primary';
    },1)
  }
</script>

<template>
  <el-button  :icon="icon"
              :type="type"
              id="star-btn"
              class="star-btn"
              @click="DoneClick"
  >
    {{DoneStr}}
  </el-button>
</template>

<style scoped>

</style>