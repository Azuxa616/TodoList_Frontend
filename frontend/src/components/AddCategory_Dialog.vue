<script setup lang="ts">
//添加分类
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
import {addCategories} from "@/net";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import {DocumentAdd} from "@element-plus/icons-vue";


const newCategoryName = ref('')
const addDialogVisible = ref(false)
const TodoStore = useTodoItemStore()

const onRefresh = () => {
  TodoStore.CategoriesMap.clear()
  setTimeout(()=>{
        TodoStore.queryAll()
        setTimeout(()=>{
          TodoStore.UserContentInit()
        },10)
      },10
  )
}

const onAddCategory = () => {
  if (newCategoryName.value.length > 10) {
    ElMessage.error('分类名称不能超过10个字符')
    return
  }
  if (newCategoryName.value) {
    addCategories([newCategoryName.value],()=>{
      ElMessage.success('成功添加标签')
      newCategoryName.value = ''
      addDialogVisible.value = false
      onRefresh()
    },()=>{
      ElMessage.error('添加标签失败')
    })
  }
  addDialogVisible.value = false
}

const onCancel = () => {
  addDialogVisible.value = false
  newCategoryName.value = ''
}
</script>

<template>
  <!--      添加分类按钮 -->
  <el-button  type="success"  @click="addDialogVisible=true">
    <slot></slot>
  </el-button>

  <!--添加分类弹窗-->
  <el-dialog v-model="addDialogVisible" title="Add a Category" width="500" destroy-on-close>
    <div>
      <el-input v-model="newCategoryName" placeholder="Type Category Name" />
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel">Cancel</el-button>
        <el-button type="primary" @click="onAddCategory">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>

</style>