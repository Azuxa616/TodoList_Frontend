<template>
  <div class="add-todo-draw">
    <el-button @click="dialog = true"
               type="success"
               class="add-button">
      <el-icon><CirclePlus /></el-icon>
      <span>添加任务</span>
    </el-button>
    <el-drawer
        v-model="dialog"
        title="添加新任务"
        :before-close="handleClose"
        direction="ltr"
        class="todo-drawer"
        size="40%"
        :destroy-on-close="false"
        :modal-append-to-body="false"
    >
      <div class="drawer-content">
        <el-form :model="form"
                 size="large"
                 class="todo-form"
                 ref="ruleFormRef"
                 :rules="rules"
                 status-icon
                 label-position="top"
        >
          <!-- 标题 -->
          <el-form-item label="标题" :label-width="formLabelWidth" prop="title" class="title-item">
            <el-input v-model="form.title"
                      autocomplete="off"
                      style="width: 100%"
                      placeholder="请输入标题"
                      class="title-input"
            />
          </el-form-item>
          <!-- 描述 -->
          <el-form-item label="描述" :label-width="formLabelWidth" class="description-item">
            <el-input
                v-model="form.detail"
                style="width: 100%"
                :autosize="{ minRows: 3, maxRows: 6 }"
                type="textarea"
                placeholder="请输入任务详细描述"
                class="description-input"
            />

          </el-form-item>

          <!-- 截止日期 -->
          <el-form-item label="截止日期" :label-width="formLabelWidth" prop="deadline" class="deadline-item">
            <DateTime_Selector v-model="form.deadline" />
          </el-form-item>

          <!--分类-->
          <el-form-item label="分类" :label-width="formLabelWidth" class="category-item">
            <div class="category-wrapper">
              <el-select
                  v-model="form.category"
                  placeholder="请选择分类"
                  size="large"
                  clearable
                  filterable
                  style="width: 100%"
                  class="category-select"
              >
                <el-option
                    v-for="item in TodoStore.UserContent.categories"
                    :key="item.id"
                    :label="item.name"
                    :value="item.name"
                />
              </el-select>
              <AddCategory_Dialog class="add-category-button"><el-icon><CirclePlus/></el-icon></AddCategory_Dialog>
            </div>
          </el-form-item>

          <!-- 标签 -->
          <el-form-item label="标签"
                        :label-width="formLabelWidth"
                        class="tags-item">
            <TagEdit_FormItem v-model="form.tags"/>

          </el-form-item>
        </el-form>
          <!--按钮-->
        <div class="drawer-footer">
          <el-button type="primary" :loading="loading" @click="onClick(ruleFormRef)" class="submit-button">
            {{ loading ? '提交中...' : '提交' }}
          </el-button>
          <el-button @click="cancelForm" class="cancel-button">取消</el-button>
        </div>

      </div>
    </el-drawer>
  </div>

</template>

<script lang="ts" setup>
import {reactive, ref, watch} from 'vue'

import DateTime_Selector from './DateTime_Selector.vue'
import TagEdit_FormItem from '@/components/TagEdit_FormItem.vue'
import AddCategory_Dialog from "@/components/AddCategory_Dialog.vue";

import {useTaskFormStore} from "@/stores/FormStore/AddTodoTaskFormStore.ts";
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
import {storeToRefs} from "pinia";

import {CirclePlus} from "@element-plus/icons-vue";
import { ElDrawer, ElMessageBox ,ElMessage} from 'element-plus'

import type {  FormInstance, FormRules } from 'element-plus'

// const userStore = useAccountStore()
// const categories =storeToRefs(userStore).UserContent.value.categories

const TodoStore =useTodoItemStore()
const formStore = useTaskFormStore()
const form = storeToRefs(formStore).AddTaskForm.value

let Tags = reactive<string[]>([])

interface RuleForm {
  title: string
  detail: string
  deadline: string
  category: string
  tags: string[]
  isStared: boolean
}

const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<RuleForm>>({
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 20, message: '标题长度应在3到20个字符之间', trigger: 'blur' }
        ],
        detail: [
            { required: true, message: '请输入任务描述', trigger: 'blur' },
        ],
        category: [
            { required: true, message: '请选择分类', trigger: 'blur' },
        ]
    }
)


const formLabelWidth = '80px'
let timer:any

const dialog = ref(false)
const loading = ref(false)


watch(Tags, (newVal) => {
  formStore.AddTaskForm.tags = newVal
})

const onClick =async(formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate((valid, fields) => {
    if (valid) {
      formStore.submitForm()
      console.log('submit!')
      setTimeout(() => {
        loading.value = false
        dialog.value = false
        formStore.initForm()
      }, 400)
    } else {
      console.log('error submit!', fields)
      loading.value = false
    }
  })
}


const handleClose = (done:any) => {
  if (loading.value) {
    return
  }
done()
  // ElMessageBox.confirm('Do you want to submit?')
  //     .then(() => {
  //       loading.value = true
  //       timer = setTimeout(() => {
  //         done()
  //         // 动画关闭需要一定的时间
  //         setTimeout(() => {
  //           loading.value = false
  //         }, 400)
  //       }, 2000)
  //     })
  //     .catch(() => {
  //     })
}

const cancelForm = () => {
  loading.value = false
  dialog.value = false
  clearTimeout(timer)
  formStore.initForm()
  console.log('cancel!',form.detail)
}
</script>
<style scoped>
.add-todo-draw {
  display: inline-block;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 8px;
  border-radius: 8px;
  background: linear-gradient(to right, #67c23a, #95d475);
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  box-shadow: 0 4px 10px rgba(103, 194, 58, 0.3);
  transition: all 0.3s ease;
}

.add-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 15px rgba(103, 194, 58, 0.4);
  background: linear-gradient(to right, #5daf33, #85c464);
}

:deep(.todo-drawer .el-drawer__header) {
  margin-bottom: 20px;
  padding: 20px;
  border-bottom: 1px solid #e4e7ed;
  font-size: 20px;
  font-weight: 600;
  color: #333;
}

:deep(.todo-drawer .el-drawer__body) {
  padding: 0;
}

.drawer-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.todo-form {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}

:deep(.el-form-item__label) {
  font-weight: 600;
  color: #333;
  font-size: 15px;
}

.title-item, .description-item, .deadline-item, .category-item, .tags-item {
  margin-bottom: 20px;
}

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #dcdfe6;
  border-radius: 6px;
  transition: all 0.3s ease;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #67c23a;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 2px rgba(103, 194, 58, 0.2);
}

.category-wrapper {
  display: flex;
  align-items: center;
  width: 100%;
}

.category-select {
  flex: 1;
}

.add-category-button {
  margin-left: 10px;
  color: #67c23a;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-category-button:hover {
  transform: scale(1.1);
  color: #5daf33;
}

:deep(.el-textarea__inner) {
  border-radius: 6px;
  transition: all 0.3s ease;
  padding: 12px;
  line-height: 1.5;
}

:deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 2px rgba(103, 194, 58, 0.2);
}

.drawer-footer {
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  border-top: 1px solid #e4e7ed;
  gap: 15px;
}

.submit-button {
  background: linear-gradient(to right, #67c23a, #95d475);
  border: none;
  border-radius: 6px;
  font-weight: 600;
  padding: 12px 24px;
  transition: all 0.3s ease;
}

.submit-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(103, 194, 58, 0.3);
}

.cancel-button {
  border-radius: 6px;
  padding: 12px 24px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.cancel-button:hover {
  transform: translateY(-2px);
}

:deep(.el-tag) {
  margin: 2px 4px;
  border-radius: 4px;
  transition: all 0.3s ease;
  background-color: rgba(103, 194, 58, 0.1);
  border-color: rgba(103, 194, 58, 0.2);
  color: #67c23a;
}

:deep(.el-tag:hover) {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

:deep(.el-tag .el-tag__close) {
  color: #67c23a;
  background-color: transparent;
}

:deep(.el-tag .el-tag__close:hover) {
  background-color: #67c23a;
  color: white;
}
</style>