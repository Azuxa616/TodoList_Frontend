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
  <div class="tag-edit-container">
    <transition-group name="tag-fade" tag="div" class="tags-group">
      <el-tag
          v-for="tag in modelValue"
          :key="tag"
          closable
          :disable-transitions="false"
          @close="handleClose(tag)"
          class="tag-item"
      >
        {{ tag }}
      </el-tag>
    </transition-group>
    
    <div class="input-container">
      <el-input
          v-if="inputVisible"
          ref="InputRef"
          v-model="inputValue"
          class="tag-input"
          size="small"
          placeholder="输入标签名称"
          @keyup.enter="handleInputConfirm"
          @blur="handleInputConfirm"
      />
      <el-button 
          v-else 
          class="add-tag-button" 
          size="small" 
          @click="showInput"
          type="primary"
          
      >
        添加标签
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.tag-edit-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  width: 100%;
}

.tags-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 10px;
}

.tag-item {
  margin-right: 8px;
  margin-bottom: 8px;
  transition: all 0.3s ease;
  background-color: rgba(64, 158, 255, 0.1);
  border-color: rgba(64, 158, 255, 0.2);
  color: #409eff;
  font-weight: 500;
  border-radius: 4px;
  padding: 0 10px;
  height: 32px;
  line-height: 30px;
}

.tag-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  background-color: rgba(64, 158, 255, 0.2);
}

.input-container {
  display: flex;
  align-items: center;
}

.tag-input {
  width: 120px;
  max-width: 100%;
  margin-right: 8px;
  transition: all 0.3s ease;
}

:deep(.tag-input .el-input__wrapper) {
  border-radius: 4px;
  box-shadow: 0 0 0 1px #dcdfe6;
}

:deep(.tag-input .el-input__wrapper:hover) {
  box-shadow: 0 0 0 1px #409eff;
}

:deep(.tag-input .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #409eff;
}

.add-tag-button {
  border-radius: 4px;
  border: 1px dashed #c0c4cc;
  background-color: #fff;
  color: #409eff;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.add-tag-button:hover {
  color: #fff;
  background-color: #409eff;
  border-color: #409eff;
  box-shadow: 0 2px 6px rgba(64, 158, 255, 0.2);
}

/* 标签渐变动效 */
.tag-fade-enter-active,
.tag-fade-leave-active {
  transition: all 0.3s ease;
}

.tag-fade-enter-from,
.tag-fade-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.tag-fade-leave-active {
  position: absolute;
}
</style>