<script setup lang="ts">
import { ref } from 'vue'
import {Select, CircleClose ,Calendar} from "@element-plus/icons-vue";
import {useDataSelectedItemStore} from "@/stores/TodoItemSelectedByDate.ts";

const selectedItemStore = useDataSelectedItemStore();


const date = ref('')
const active = ref<0|1|2>(0)
const inputDisabled = ref<boolean>(true);


let icon = ref (active.value? Select : Calendar)
let type=ref(active.value ? 'success':'primary')

  const onChange = () => {
    if (active.value == 0) {
      active.value = 1
      inputDisabled.value =false
      setTimeout(()=> {
        icon.value =Select
        type.value ='success'
      },1)
    }else if(active.value == 1){
      active.value = date.value? 2:0
      setTimeout(()=> {
        if(active.value == 2){
          onSelect()
        }
        icon.value =active.value ? CircleClose : Calendar
        type.value =active.value ? 'danger':'primary'
        inputDisabled.value = true

      },1)
    }else if(active.value == 2){
      active.value = 0
      date.value = ''
      setTimeout(()=> {
        icon.value =Calendar
        type.value ='primary'
        selectedItemStore.isSelected = false
      },1)
    }
  }

  const onSelect = () => {
    selectedItemStore.isSelected = true
    selectedItemStore.selectByDate(date.value)
  }
</script>

<template>

  <div class="demo-date-picker">
    <div class="block">
      <el-date-picker
          v-model="date"
          type="date"
          placeholder="Pick a day"
          v-if="active"
          format="YYYY-MM-DD"
          value-format="YYYY-MM-DD"
          :disabled="inputDisabled"
      />
      <el-button  @click="onChange()" :icon="icon" :type="type"></el-button>
    </div>
  </div>
</template>

<style scoped>
.demo-date-picker {
  display: flex;
  padding: 0;
  flex-wrap: wrap;
}

.demo-date-picker .block {
  border-right: solid 1px var(--el-border-color);
  flex: 1;
  display: flex;
}

.demo-date-picker .block:last-child {
  border-right: none;
}

.demo-date-picker .demonstration {
  display: block;
  color: var(--el-text-color-secondary);
  font-size: 14px;
  margin-bottom: 20px;
}
</style>