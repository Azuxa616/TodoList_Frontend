<script setup lang="ts">
import {ref} from "vue";
import {Finished, Select} from "@element-plus/icons-vue";
import{useTodoItemStore} from "@/stores/TodoItemStore.ts";

const TodoStore = useTodoItemStore()
const props = defineProps(['Tid'])

const isDone = defineModel()
const type = ref(isDone.value ? 'success' : 'primary')
const icon = ref(isDone.value ? Select : Finished)
const DoneStr = ref(isDone.value ? '' : '完成');

const DoneClick = () => {
  isDone.value = !isDone.value;

  setTimeout(() => {
    TodoStore.onCompleteTask(props.Tid, isDone.value ? 1 : 0)
    icon.value = isDone.value ? Select : Finished;
    DoneStr.value = isDone.value ? '' : '完成'
    type.value = isDone.value ? 'success' : 'primary';
  }, 1)
}
</script>

<template>
  <div class="done-button-container">
    <el-button 
        :icon="icon"
        :type="type"
        class="done-button"
        @click="DoneClick"
        :class="{ 'is-done': isDone }"
    >
      {{ DoneStr }}
    </el-button>
  </div>
</template>

<style scoped>
.done-button-container {
  display: inline-block;
}

.done-button {
  border-radius: 6px;
  font-weight: 500;
  padding: 8px 16px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  border: none;
}

.done-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
}

.done-button:active {
  transform: translateY(0);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.done-button.is-done {
  background-color: #67c23a;
  color: white;
}

.done-button.is-done:hover {
  background-color: #5daf33;
}

:deep(.el-icon) {
  font-size: 16px;
  transition: all 0.3s ease;
  margin-right: 4px;
}

.done-button:hover :deep(.el-icon) {
  transform: scale(1.2);
}

.done-button.is-done :deep(.el-icon) {
  animation: bounce 0.5s;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
  60% {
    transform: translateY(-3px);
  }
}
</style>