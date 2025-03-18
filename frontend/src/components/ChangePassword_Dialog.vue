<script setup lang="ts">
  import { reactive, ref } from 'vue'
  import type { FormInstance, FormRules } from 'element-plus'
  import {useChangePassFormStore} from '@/stores/FormStore/ChangePassFormStore.ts'
  import {storeToRefs} from "pinia";


  const dialogFormVisible = ref(false)
  const formLabelWidth = '140px'
  const ruleFormRef = ref<FormInstance>()
  const formStore = useChangePassFormStore()
  const form =storeToRefs(formStore).Form.value

  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password'))
    } else {
      if (form.pass_check !== '') {
        if (!ruleFormRef.value) return
        ruleFormRef.value.validateField('checkPass')
      }
      callback()
    }
  }
  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === '') {
      callback(new Error('Please input the password again'))
    } else if (value !== form.pass_new) {
      callback(new Error("Two inputs don't match!"))
    } else {
      callback()
    }
  }

  const rules = reactive<FormRules<typeof form>>({
    pass_pre: [{ validator: validatePass, trigger: 'blur' },
      {max:20,min:6,message:'Password length must be between 6 and 20',trigger:'blur'}],
    pass_check: [{ validator: validatePass2, trigger: 'blur' }],
  })

  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        console.log('submit!')
        formStore.submitPass()
        dialogFormVisible.value = false
      } else {
        console.log('error submit!')
        dialogFormVisible.value = false
      }
    })
  }

  const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.resetFields()
  }

</script>

<template>

  <el-button class="change-password-button" type="warning" @click="dialogFormVisible = true">
    修改密码
  </el-button>

  <el-dialog v-model="dialogFormVisible" title="Change Password" width="800" >
    <el-form
        ref="ruleFormRef"
        :model="form"
        style="max-width: 600px"
        status-icon
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm">

<!--      <el-form-item label="Previous Password" :label-width="formLabelWidth"  prop="pass_pre">-->
<!--        <el-input v-model="form.pass_pre" autocomplete="off" type="password"/>-->
<!--      </el-form-item>-->

      <el-form-item label="New Password" :label-width="formLabelWidth" prop="pass_new" >
        <el-input v-model="form.pass_new" autocomplete="off" type="password"/>
      </el-form-item>

      <el-form-item label="Confirm Password" :label-width="formLabelWidth"  prop="pass_check">
        <el-input v-model="form.pass_check" autocomplete="off" type="password"/>
      </el-form-item>


    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogFormVisible= false">Cancel</el-button>
        <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          Confirm
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
.change-password-button{
  margin-left: 10px;
  width: 30%;
}
</style>