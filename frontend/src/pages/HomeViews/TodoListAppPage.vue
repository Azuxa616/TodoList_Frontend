<script setup lang="ts">

import AddTodo_Draw from "@/components/AddTodo_Draw.vue";
import TodoTask_Item from "@/components/TodoTask_Item.vue";
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
import Date_Selector from "@/components/Date_Selector.vue";
import {useDataSelectedItemStore} from "@/stores/TodoItemSelectedByDate.ts";
import {onMounted, ref, watch} from "vue";
import {storeToRefs} from "pinia";
import {Clock, Refresh} from "@element-plus/icons-vue";

const selectorActive = ref(false);

const selectedItemStore = useDataSelectedItemStore();
const selectedItems = storeToRefs(selectedItemStore).SelectedTodoItems.value.items;

const todoItemStore = useTodoItemStore();
const todoItems = storeToRefs(todoItemStore).TodoItems.value.items;

const ItemList =selectedItemStore.isSelected
    ? useDataSelectedItemStore().SelectedTodoItems.items :useTodoItemStore().TodoItems.items

let TitleDateSpan= ref("All Tasks");
let TitleDate = ref("");

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

watch(storeToRefs(selectedItemStore).isSelected ,()=>{
  TitleDate.value = storeToRefs(selectedItemStore).selectedDate.value;
  // setTimeout(() => {
  //   TitleDateSpan.value = storeToRefs(selectedItemStore).isSelected.value? `Tasks in ${TitleDate.value}` : "All Tasks";
  // },10)
  TitleDateSpan.value = storeToRefs(selectedItemStore).isSelected.value? `Tasks in this Day` : "All Tasks";
  // TitleDate.value = useDataSelectedItemStore().isSelected? `Tasks in this Day` : "All Tasks";
})

watch(todoItemStore.TodoItems.items, (newVal, oldVal) => {
  onRefresh();
})

</script>

<template class="TodoApp">
  <div class="TodoApp" v-if="active">
    <div class="TodoApp-header-title" >
      <div class="title">
        <el-icon  class="icon"><Clock /></el-icon>
        <span >My Task</span>

      </div>
      <div class="sub-box">
      <AddTodo_Draw class="btn-item" />
      </div>
    </div>
    <el-divider  class="TodoApp-header-divider" />
    <div class="TodoApp-header-date">
      <div>
        <span class="date-title"> {{TitleDateSpan}} </span>
      </div>
      <div class="sub-box">
        <Date_Selector class="date-selector" />
        <el-button type="primary" @click="onRefresh()"><el-icon><Refresh /></el-icon></el-button>
      </div>

    </div>
    <el-divider  class="TodoApp-header-divider" />
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
  .TodoApp-header-date .sub-box{
    display: flex;
    align-items: center;
    flex-direction: row;
    margin-right: 3%
  }
  .TodoApp-header-date .date-title{
    font-weight: bold;
    font-size: 30px;
    color: rgba(222, 39, 15, 0.67);
    margin-left: 30px;
  }
  .date-selector {
    margin-right: 20px;
  }
  .TodoApp-header-date {
    display: flex;
    justify-content: space-between;
  }
  .sub-box{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 20px;
    justify-content: center;

  }
  .sub-box-sub1{
    display: flex;
    padding-top: 10px;
    position: relative;
  }
  .TodoApp-header-divider{
    margin: 5px 0;
  }
 .TodoApp-header-title .title{
   text-align: center;
   font-size: 40px;
   font-weight: bold;
   color: #000000;
   margin-left: 20px;
   margin-top:0;
   padding-top: 5px;
 }
  .TodoApp-header-title{
    display: flex;
    justify-content: space-between;
    font-weight: bold;
    margin-bottom: 10px;
    margin-left: 20px;
    margin-top:10px
  }
  .TodoApp {
    min-height:700px;
    height: 100%;
    width: 100%;
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