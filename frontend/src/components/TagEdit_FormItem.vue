<script setup lang="ts">
import {nextTick, onMounted, ref, toRef} from 'vue'
  import { ElInput } from 'element-plus'
  import type { InputInstance } from 'element-plus'
  const inputValue = ref('')

// 接收props
 const {modelValue} =defineProps(["modelValue"])
//声明emit
  const emit = defineEmits(['update:model-Value'])

//输入框显示
  const inputVisible = ref(false)
//输入响应
  const InputRef = ref<InputInstance>()
//删除标签
  const handleClose = (tag: string) => {
    console.log(modelValue.indexOf(tag))
    modelValue.splice(modelValue.indexOf(tag), 1)
  }

//输入框切换
  const showInput = () => {
    inputVisible.value = true
    nextTick(() => {
      InputRef.value!.input!.focus()
    })
  }

//添加标签

  const handleInputConfirm = () => {
    if (inputValue.value) {
      // props.tags.push(inputValue.value)
      modelValue.push(inputValue.value)
    }
    inputVisible.value = false
    inputValue.value = ''
  }

</script>

<template>
  <div class="flex gap-2">
    <el-tag


        v-for="tag in modelValue"
        :key="tag"
        closable
        :disable-transitions="false"
        @close="handleClose(tag)"
        style="margin-right: 10px;"
    >
      {{ tag }}
    </el-tag>
    <el-input
        v-if="inputVisible"
        ref="InputRef"
        v-model="inputValue"
        class="w-20"
        size="small"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
    />
    <el-button v-else class="button-new-tag" size="small" @click="showInput">
      + New Tag
    </el-button>
  </div>
</template>

<style scoped>

</style>