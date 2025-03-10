<script setup lang="ts">

import AddTodo_Draw from "@/components/AddTodo_Draw.vue";
import TodoTask_Item from "@/components/TodoTask_Item.vue";
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
import Date_Selector from "@/components/Date_Selector.vue";
import {useDataSelectedItemStore} from "@/stores/TodoItemSelectedByDate.ts";
import {onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {Refresh} from "@element-plus/icons-vue";

const selectorActive = ref(false);

const selectedItemStore = useDataSelectedItemStore();
const selectedItems = storeToRefs(selectedItemStore).SelectedTodoItems.value.items;

const todoItemStore = useTodoItemStore();
const todoItems = storeToRefs(todoItemStore).TodoItems.value.items;

const ItemList =selectedItemStore.isSelected
    ? useDataSelectedItemStore().SelectedTodoItems.items :useTodoItemStore().TodoItems.items

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
    <div class="TodoApp-header">

      <el-button type="primary" @click="onRefresh()"><el-icon><Refresh /></el-icon>Refresh</el-button>
      <Date_Selector />
    </div>
    <TodoTask_Item v-for="item in (selectedItemStore.isSelected
                              ? useDataSelectedItemStore().SelectedTodoItems.items :useTodoItemStore().TodoItems.items )"
                   :key="item.id"
                   :item="item"
    ></TodoTask_Item>

<!--    空状态显示-->
    <div v-if="(selectedItemStore.isSelected
                              ? useDataSelectedItemStore().SelectedTodoItems.items
                              :useTodoItemStore().TodoItems.items ).length == 0"  >
      <div class="title">No Task To Do</div>
      <div class="sub-title">Have A Nice Day!</div>
    </div>
  </div>
</template>

<style scoped>
  .TodoApp {
    min-height:700px;
    height: 100px;
    width: 100%;
  }
  .TodoApp-header {
    display: flex;
  }
 .title{
    font-size: 40px;
    font-weight: bold;
    margin-top: 100px;
    text-align: center;
    color: rgba(194, 194, 194, 0.87);
 }
 .sub-title {
   text-align: center;
   color: rgba(194, 194, 194, 0.87);
 }
</style>