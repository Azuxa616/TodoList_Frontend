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

onMounted(() => {
  console.log("mounted")
  ItemStore.queryAll()
  console.log("props", props.item.tags)
  // Tags = props.item.tagNameList
})
// 详情表宽度
const formLabelWidth = '80px' // 表单项标签宽度


//test

watch(Tags, (newVal) => {
  props.item.tagNameList = newVal
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
  <el-form :model="props.item" size="large" class="from-body">
    <!-- 标题 -->
    <el-form-item label="Title" :label-width="formLabelWidth">
      <el-input v-model="props.item.title"
                autocomplete="off"
                style="width: 300px"
                placeholder="Title Here"
      />
      <el-button type="text" >
        <Star_Btn  v-model="props.item.star" :Tid="props.item.id"/>
      </el-button>
    </el-form-item>
    <!-- 描述 -->
    <el-form-item label="Description" :label-width="formLabelWidth">
      <el-input
          v-model="props.item.description"
          style="width: 240px"
          :autosize="{ minRows: 2, maxRows: 4 }"
          type="textarea"
          placeholder="Please input description"
      />

    </el-form-item>

    <!-- 截止日期 -->
    <el-form-item label="Deadline" :label-width="formLabelWidth">
      <DateTime_Selector v-model="props.item.dueDate" />
    </el-form-item>

    <!--分类-->
    <el-form-item label="Category" :label-width="formLabelWidth">
      <el-select
          v-model="props.item.category"
          placeholder="Select"
          size="large"
          clearable
          filterable
          style="width: 240px"
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
    <el-form-item label="Tags" :label-width="formLabelWidth" >
      <TagEdit_FormItem v-model="Tags" />
    </el-form-item>
<!--    按钮组(外置到父组件)-->
<!--    <div>-->
<!--      <el-button id="save-btn" type="success" @click="onSave()">Save</el-button>-->
<!--      <el-button id="save-btn" type="danger" @click="onDelete()">Delete</el-button>-->
<!--    </div>-->
  </el-form>

</template>

<style scoped>

</style>