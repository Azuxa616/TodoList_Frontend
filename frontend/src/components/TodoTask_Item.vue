<script setup lang="ts">
import {onMounted, ref, watch} from 'vue';
  import Star_Btn from "@/components/Star_Btn.vue";
  import Done_Btn from "@/components/Done_Btn.vue";
  import DateTime_Selector from "@/components/DateTime_Selector.vue";
  import TagEdit_FormItem from "@/components/TagEdit_FormItem.vue";
  import TodoTaskInfo_Form from "@/components/TodoTaskInfo_Form.vue";
  import {useAccountStore} from "@/stores/UserStore.ts";
  import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
  import {modifyTask,deleteTask} from "@/net";
import {ElMessage} from "element-plus";

const props =defineProps(['item',"key"])
  const ItemStore = useTodoItemStore()

  // --详情弹出框开关
  const taskInfoDialogVisible = ref(false)
  const deleteDialogVisible = ref (false)


interface TodoItemInterface {
  id: number;
  userid: string
  title: string
  description: string
  status: number
  star: number
  dueDate: string
  createTime: string
  category: string
  tags: string[]
}

//修改任务
const modifyTodoTask = (task: TodoItemInterface) => {
  console.log("修改任务", task.category)
  modifyTask(
      task.id,
      task.title,
      task.description,
      task.dueDate,
      task.category? task.category : "",
      task.tags,
      (response: any) => {
        console.log('修改成功：',response)
        ElMessage.success(" 修改成功!")
      }
  )
}


//删除任务
const deleteTodoTask = (task: any) => {
  deleteTask(task.id,()=>{
    console.log("删除成功")
    ElMessage.success(" 删除成功!")
    deleteDialogVisible.value = false
    ItemStore.queryAll()
  })
}
// 保存
const onSave = () => {
  console.log("onSave", props.item)
  modifyTodoTask(props.item)
  taskInfoDialogVisible.value = false
}
const onDelete = () => {
  console.log("onDelete", props.item)
  if(props.item.status === 0){
    deleteDialogVisible.value = true
  }else {
    deleteTodoTask(props.item)
    taskInfoDialogVisible.value = false
  }
}
const showDialog = () => {
  taskInfoDialogVisible.value = true
  ItemStore.queryAll()
}
</script>

<template>
  <div class="todo-task-item" :class=" {'done':props.item.status}">
    <div class="star-btn">
      <Star_Btn v-model="props.item.star" :Tid="props.item.id"/>
    </div>

    <div class="todo-task-item__content">
      <div class="todo-task-item__title"
           :class=" {'done':props.item.status} "
           @click="showDialog()"
      >
        {{ props.item.title }}
      </div>
      <div class="todo-task-item__description"
           :class="{'done': props.item.status}"
           @click="showDialog()"
      >
        {{props.item.description }}
      </div>
    </div>
    <div class="todo-task-item__actions">
      <Done_Btn v-model="props.item.status" :Tid="props.item.id"/>
    </div>
  </div>
  <!--详情弹出框-->
  <el-dialog v-model="taskInfoDialogVisible" title="Modify Task" width="700" center>
      <TodoTaskInfo_Form :item="props.item"/>
    <!--    按钮组-->
    <div>
      <el-button id="save-btn" type="success" @click="onSave()">Save</el-button>
      <el-button id="save-btn" type="danger" @click="onDelete()">Delete</el-button>
    </div>
    <!--    删除确认弹出框-->
    <el-dialog v-model="deleteDialogVisible" title="Delete Task" width="40%" center>
      <div>
        This task haven't been done, are you sure to delete it?
      </div>
      <div>
        <el-button id="delete-btn" type="danger" @click="deleteTodoTask(props.item)">Delete</el-button>
        <el-button id="cancel-btm"  @click="deleteDialogVisible = false">Cancel</el-button>
      </div>
    </el-dialog>
  </el-dialog>
</template>

<style scoped>
  .star-btn {
    margin-right: 10px;
  }
  .done{
    text-decoration: line-through;
    color: rgba(190, 0, 0, 0.62);
    background: rgba(225, 222, 222, 0.26);
  }
  .todo-task-item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #ccc;
    width: 90%;
    margin-left: 5%;
    position: relative;
  }

 .todo-task-item__content {
    flex: 1;
  }

 .todo-task-item__title {
    font-size: 18px;
    font-weight: bold;
  }

 .todo-task-item__description {
    font-size: 14px;
    margin-top: 5px;
  }

 .todo-task-item__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    right: 0;
  }
  .todo-task-item:hover {
    cursor: pointer;
    color: rgba(225, 222, 222, 0.26);
    background-color: rgba(255, 230, 175, 0.55);
  }
</style>