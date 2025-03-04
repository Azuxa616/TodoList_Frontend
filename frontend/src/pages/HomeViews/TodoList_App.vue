<script setup lang="ts">

import AddTodo_Draw from "@/components/AddTodo_Draw.vue";
import TodoTask_Item from "@/components/TodoTask_Item.vue";
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";

import {onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {Refresh} from "@element-plus/icons-vue";

const todoItemStore = useTodoItemStore();
const todoItems = storeToRefs(todoItemStore).TodoItems.value.items;
let active =ref(false);
onMounted(()=> {
  todoItemStore.queryAll()
  setTimeout(() => {
    active.value=true;
    // console.log("!!!",useTodoItemStore().TodoItems.items)
    // console.log("!!!",todoItems)
  },1)

});
const onRefresh = () => {
  console.log("RefreshTask!!");
  todoItemStore.queryAll()
  active.value = false;
  setTimeout(() => {
    active.value = true;
  }, 10);
}

watch(todoItemStore.TodoItems.items, (newVal, oldVal) => {
  onRefresh();
})

</script>

<template class="TodoApp">
  <div class="TodoApp" v-if="active">
      <AddTodo_Draw />
    <el-button type="primary" @click="onRefresh()"><el-icon><Refresh /></el-icon>Refresh</el-button>
      <TodoTask_Item v-for="item in useTodoItemStore().TodoItems.items"
        :key="item.id"
        :item="item"
        />
  </div>
</template>

<style scoped>
  .TodoApp {
    min-height:700px;
    height: 100px;
    width: 100%;
  }

</style>