<template>
  <div class="AddTodo_Draw">
    <el-button @click="dialog = true"
               type="success">
      <el-icon><CirclePlus /></el-icon>
      Add New Task
    </el-button>
    <el-drawer

        v-model="dialog"
        title="Add a Task"
        :before-close="handleClose"
        direction="ltr"
        class="demo-drawer"
        size="40%"
    >
      <div class="demo-drawer__content">
        <el-form :model="form"
                 size="large"
                 class="from-body"
                 ref="ruleFormRef"
                 :rules="rules"
                 status-icon
        >
          <!-- 标题 -->
          <el-form-item label="Title" :label-width="formLabelWidth" prop="title">
            <el-input v-model="form.title"
                      autocomplete="off"
                      style="width: 300px"
                      placeholder="Title Here"
            />

<!--            星标（弃用）-->
<!--            <el-button type="text" >-->
<!--              <Star_Btn v-model="form.isStared" />-->
<!--            </el-button>-->
          </el-form-item>
          <!-- 描述 -->
          <el-form-item label="Description" :label-width="formLabelWidth">
            <el-input
                v-model="form.detail"
                style="width: 240px"
                :autosize="{ minRows: 2, maxRows: 4 }"
                type="textarea"
                placeholder="Please input description"
            />

          </el-form-item>

          <!-- 截止日期 -->
          <el-form-item label="Deadline" :label-width="formLabelWidth" prop="deadline">
            <DateTime_Selector v-model="form.deadline" />
          </el-form-item>

          <!--分类-->
          <el-form-item label="Category" :label-width="formLabelWidth">
            <el-select
                v-model="form.category"
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
          <el-form-item label="Tags"
                        :label-width="formLabelWidth">
            <TagEdit_FormItem  v-model="form.tags"/>
          </el-form-item>
        </el-form>
          <!--按钮-->
        <div class="demo-drawer__footer">
          <el-button type="primary" :loading="loading" @click="onClick(ruleFormRef)">
            {{ loading ? 'Submitting ...' : 'Submit' }}
          </el-button>
          <el-button @click="cancelForm">Cancel</el-button>
        </div>

      </div>
    </el-drawer>
  </div>

</template>

<script lang="ts" setup>
import {reactive, ref, watch} from 'vue'
import { ElDrawer, ElMessageBox ,ElMessage} from 'element-plus'
import DateTime_Selector from './DateTime_Selector.vue'
import TagEdit_FormItem from '@/components/TagEdit_FormItem.vue'
import Star_Btn from "@/components/Star_Btn.vue";
import {useAccountStore} from '@/stores/UserStore.ts'
import {useTaskFormStore} from "@/stores/FormStore/AddTodoTaskFormStore.ts";
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
import {storeToRefs} from "pinia";
import {CirclePlus} from "@element-plus/icons-vue";
import type {  FormInstance, FormRules } from 'element-plus'

// const userStore = useAccountStore()
// const categories =storeToRefs(userStore).UserContent.value.categories

const TodoStore =useTodoItemStore()
const categories =TodoStore.UserContent.categories

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
          { required: true, message: 'Please input title', trigger: 'blur' },
          { min: 3, max: 20, message: 'Title length must be 3 to 20', trigger: 'blur' }
        ],
        detail: [
            { required: true, message: 'Please input due date', trigger: 'blur' },
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

</style>