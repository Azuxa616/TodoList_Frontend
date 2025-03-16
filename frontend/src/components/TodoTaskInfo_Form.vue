<script setup lang="ts">


import DateTime_Selector from "@/components/DateTime_Selector.vue";
import TagEdit_FormItem from "@/components/TagEdit_FormItem.vue";
import {modifyTask} from "@/net";
import Star_Btn from "@/components/Star_Btn.vue";

// import {useTaskInfoFormStore} from "@/stores/FormStore/TaskInfoFormStore.ts";
import {useAccountStore} from '@/stores/UserStore.ts'
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
import {storeToRefs} from "pinia";
import {onMounted, reactive, ref,watch} from "vue";
import {ElMessage} from "element-plus";

// const infoFormStore = useTaskInfoFormStore();
// const infoForm = storeToRefs(infoFormStore).InfoForm.value;

const ItemStore = useTodoItemStore()
const categories =ItemStore.UserContent.categories
const props =defineProps(['item'])
let Tags = reactive<string[]>([])

console.log("props:", props.item.tags)

onMounted(() => {
  ItemStore.queryAll()
  Tags = props.item.tags
  setTimeout(() => {
    console.log("!!Tags:", Tags)
    console.log("!!props:", props.item.tags)
  },10)
  // Tags = props.item.tagNameList
})
// 详情表宽度
const formLabelWidth = '80px' // 表单项标签宽度


//test

watch(Tags, (newVal) => {
  props.item.tags = Tags
})


// // 保存
// const onSave = () => {
//   console.log("onSave", props.item)
//   modifyTodoTask(props.item)
// }
// const onDelete = () => {
//   console.log("onDelete", props.item)
//
// }

// const  TagsInit = () => {
//   console.log("TagsInit", Tags)
//   Tags = props.item.tagNameList
// }
//修改任务
// const modifyTodoTask = (task: any) => {
//   console.log("modify", task.categoryName)
//   modifyTask(
//       task.id,
//       task.title,
//       task.description,
//       task.dueDate,
//       task.categoryName,
//       task.tagNameList,
//       (response: any) => {
//         console.log('修改成功：',response)
//         ElMessage.success(" 修改成功!")
//         ItemStore.queryAll()
//       }
//   )
// }

</script>

<template>
  <el-form :model="props.item" size="large" class="todo-info-form">
    <!-- 标题 -->
    <el-form-item label="Title" :label-width="formLabelWidth" class="title-item">
      <el-input v-model="props.item.title"
                autocomplete="off"
                style="width: 300px"
                placeholder="Title Here"
                class="title-input"
      />
      <el-button type="text" class="star-button">
        <Star_Btn  v-model="props.item.star" :Tid="props.item.id"/>
      </el-button>
    </el-form-item>
    <!-- 描述 -->
    <el-form-item label="Description" :label-width="formLabelWidth" class="description-item">
      <el-input
          v-model="props.item.description"
          style="width: 240px"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="Please input description"
          class="description-input"
      />

    </el-form-item>

    <!-- 截止日期 -->
    <el-form-item label="Deadline" :label-width="formLabelWidth" class="deadline-item">
      <DateTime_Selector v-model="props.item.dueDate" />
    </el-form-item>

    <!--分类-->
    <el-form-item label="Category" :label-width="formLabelWidth" class="category-item">
      <el-select
          v-model="props.item.category"
          placeholder="Select"
          size="large"
          clearable
          filterable
          style="width: 240px"
          class="category-select"
      >
        <el-option
            v-for="item in categories"
            :key="item.id"
            :label="item.name"
            :value="item.name"
        />
      </el-select>


    </el-form-item>
    <!-- 标签 -->
    <el-form-item label="Tags" :label-width="formLabelWidth" class="tags-item">
      <TagEdit_FormItem v-model="props.item.tags" />
    </el-form-item>
<!--    按钮组(外置到父组件)-->
<!--    <div>-->
<!--      <el-button id="save-btn" type="success" @click="onSave()">Save</el-button>-->
<!--      <el-button id="save-btn" type="danger" @click="onDelete()">Delete</el-button>-->
<!--    </div>-->
  </el-form>

</template>

<style scoped>
.todo-info-form {
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
}

:deep(.el-form-item) {
  margin-bottom: 22px;
  transition: all 0.3s ease;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #333;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6;
  border-radius: 6px;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #14a8f1;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(20, 168, 241, 0.2);
}

.title-item {
  margin-bottom: 25px;
}

.title-input {
  font-size: 18px;
}

:deep(.title-input .el-input__wrapper) {
  padding-right: 45px;
}

.star-button {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease;
}

.description-input {
  transition: all 0.3s ease;
}

:deep(.el-textarea__inner) {
  border-radius: 6px;
  transition: all 0.3s ease;
  padding: 12px;
  line-height: 1.5;
}

:deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 2px rgba(20, 168, 241, 0.2);
}

:deep(.el-select .el-input__wrapper) {
  border-radius: 6px;
}

:deep(.el-select-dropdown__item) {
  padding: 10px 20px;
}

:deep(.el-select-dropdown__item.selected) {
  color: #14a8f1;
  font-weight: 600;
}

.deadline-item, .category-item, .tags-item {
  position: relative;
}

:deep(.el-tag) {
  margin: 2px 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
  background-color: rgba(20, 168, 241, 0.1);
  border-color: rgba(20, 168, 241, 0.2);
  color: #14a8f1;
}

:deep(.el-tag:hover) {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

:deep(.el-tag .el-tag__close) {
  color: #14a8f1;
  background-color: transparent;
}

:deep(.el-tag .el-tag__close:hover) {
  background-color: #14a8f1;
  color: white;
}
</style>