<script setup lang="ts">
//添加分类
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
import {addCategories} from "@/net";
import {ElMessage} from "element-plus";
import {ref} from "vue";
import {DocumentAdd, Plus} from "@element-plus/icons-vue";

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
      ElMessage.success('成功添加分类')
      newCategoryName.value = ''
      addDialogVisible.value = false
      onRefresh()
    },()=>{
      ElMessage.error('添加分类失败')
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
  <!-- 添加分类按钮 -->
  <el-button 
      type="text" 
      class="add-category-btn" 
      @click="addDialogVisible=true"
      :icon="Plus"
  >
    <slot></slot>
  </el-button>

  <!-- 添加分类弹窗 -->
  <el-dialog 
      v-model="addDialogVisible" 
      title="添加分类" 
      width="480" 
      destroy-on-close
      custom-class="category-dialog"
  >
    <div class="dialog-content">
      <el-input 
          v-model="newCategoryName" 
          placeholder="请输入分类名称" 
          class="category-input"
          maxlength="10"
          show-word-limit
          clearable
          autofocus
      />
      <div class="category-hint">创建分类可以更好地组织您的待办事项</div>
    </div>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="onCancel" class="cancel-btn">取消</el-button>
        <el-button type="primary" @click="onAddCategory" class="confirm-btn">
          确认
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.add-category-btn {
  color: #67c23a;
  transition: all 0.3s ease;
  padding: 5px;
  border-radius: 4px;
  font-size: 16px;
}

.add-category-btn:hover {
  color: #5daf33;
  background-color: rgba(103, 194, 58, 0.1);
  transform: scale(1.1);
}

:deep(.category-dialog) {
  border-radius: 10px;
  overflow: hidden;
}

:deep(.el-dialog__title) {
  font-weight: 600;
  color: #333;
  font-size: 18px;
}

:deep(.el-dialog__header) {
  border-bottom: 1px solid #f0f0f0;
  padding: 20px;
  margin-right: 0;
}

:deep(.el-dialog__body) {
  padding: 24px 20px;
}

.dialog-content {
  padding: 0 10px;
}

.category-input {
  margin-bottom: 15px;
}

:deep(.category-input .el-input__wrapper) {
  border-radius: 6px;
  box-shadow: 0 0 0 1px #dcdfe6;
  transition: all 0.3s ease;
}

:deep(.category-input .el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #67c23a;
}

:deep(.category-input .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(103, 194, 58, 0.2);
}

.category-hint {
  color: #909399;
  font-size: 13px;
  margin-top: 5px;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding-top: 10px;
}

.cancel-btn, .confirm-btn {
  border-radius: 6px;
  padding: 9px 20px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.confirm-btn {
  background: linear-gradient(to right, #67c23a, #85c464);
  border: none;
}

.confirm-btn:hover {
  background: linear-gradient(to right, #5daf33, #7ab356);
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(103, 194, 58, 0.2);
}

:deep(.el-dialog__headerbtn:hover .el-dialog__close) {
  color: #67c23a;
}
</style>