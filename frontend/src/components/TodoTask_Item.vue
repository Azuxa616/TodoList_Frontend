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
  import dayjs from 'dayjs'

  let DateTimeNow = ref(dayjs())
  const isTimeOut = ref<boolean>(false);

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

const TimeJudge =()=>{
  let DateTimeNow = dayjs()
  let dueDate = dayjs(props.item.dueDate)
  return DateTimeNow.isAfter(dueDate);
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
      task.tags? task.tags : [],
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
  <div class="todo-task-item" :class=" {'done':props.item.status}" >
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
    <!--    分类信息显示块-->
    <div class="todo-task-item__category"
         :class=" {'done':props.item.status}"
         @click="showDialog()"
         v-if="props.item.category"
    >
      <span>{{props.item.category}}</span>
    </div>
<!--    日期信息显示块-->
    <div class="todo-task-item__date"
         :class=" {'done':props.item.status,'after':TimeJudge(),'before':!TimeJudge()}"
         @click="showDialog()
"
    >
      <span>{{props.item.dueDate}}</span>
    </div>

<!--    按钮组-->
    <div class="todo-task-item__actions">
      <Done_Btn v-model="props.item.status" :Tid="props.item.id"/>
    </div>
  </div>
  <!--详情弹出框-->
  <el-dialog v-model="taskInfoDialogVisible" title="修改任务" width="700" center custom-class="task-dialog">
      <TodoTaskInfo_Form :item="props.item"/>
    <!--    按钮组-->
    <div class="dialog-footer">
      <el-button id="save-btn" type="success" @click="onSave()">保存</el-button>
      <el-button id="delete-btn" type="danger" @click="onDelete()">删除</el-button>
    </div>
    <!--    删除确认弹出框-->
    <el-dialog v-model="deleteDialogVisible" title="删除任务" width="40%" center custom-class="delete-confirm-dialog">
      <div class="delete-confirm-message">
        该任务未完成，确定要删除吗？
      </div>
      <div class="delete-confirm-buttons">
        <el-button id="delete-btn" type="danger" @click="deleteTodoTask(props.item)">删除</el-button>
        <el-button id="cancel-btm"  @click="deleteDialogVisible = false">取消</el-button>
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
    padding: 15px;
    border-radius: 8px;
    width: 92%;
    margin: 12px auto;
    position: relative;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    background-color: #ffffff;
  }

 .todo-task-item__date {
   margin-right: 5%;
   border-radius: 8px;
   padding: 8px 12px;
   box-shadow: 0 3px 8px rgba(0, 0, 0, 0.15);
   font-weight: bold;
   font-size: 16px;
   width: 180px;
   text-align: center;
   transition: all 0.3s ease;
 }
  .todo-task-item__date.after.done {
    background: radial-gradient(rgba(91, 60, 60, 0.32), rgba(73, 60, 60, 0.32));
    color: white;
  }
  .todo-task-item__date.before.done {
    background: radial-gradient(rgba(60, 91, 61, 0.32), rgba(73, 60, 60, 0.32));
    color: white;
  }

  .todo-task-item__date.after{
    background: radial-gradient(rgba(255, 0, 0, 0.71), rgba(234, 172, 172, 0.86));
    color: white;
    animation: pulse 2s infinite;
  }
  .todo-task-item__date.before{
    background: linear-gradient(to bottom, rgba(5, 248, 51, 0.9), rgba(0, 122, 255, 0.37));
    color: white;
  }

 .todo-task-item__category {
   margin-right: 5%;
   border-radius: 8px;
   padding: 8px 12px;
   background-color: rgb(115, 203, 255);
   color: white;
   box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
   font-weight: bold;
   transition: all 0.3s ease;
 }
 .todo-task-item__content {
    flex: 1;
    padding: 0 10px;
  }

 .todo-task-item__title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
    transition: color 0.3s ease;
  }

 .todo-task-item__description {
    font-size: 14px;
    margin-top: 5px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 200px;
    color: #666;
    transition: color 0.3s ease;
 }

 .todo-task-item__actions {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
    right: 0;
  }
  .todo-task-item:hover {
    cursor: pointer;
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    background-color: rgba(255, 245, 222, 0.7);
  }

  /* 脉冲动画效果，用于到期日期提醒 */
  @keyframes pulse {
    0% {
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.4);
    }
    70% {
      box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
    }
    100% {
      box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
    }
  }

  /* 弹出框样式 */
  :deep(.task-dialog) {
    border-radius: 12px;
    overflow: hidden;
  }

  .dialog-footer {
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }

  .delete-confirm-message {
    font-size: 16px;
    margin-bottom: 20px;
    color: #606266;
    text-align: center;
  }

  .delete-confirm-buttons {
    display: flex;
    justify-content: center;
    gap: 15px;
  }

  :deep(.delete-confirm-dialog) {
    border-radius: 12px;
    overflow: hidden;
  }
</style>