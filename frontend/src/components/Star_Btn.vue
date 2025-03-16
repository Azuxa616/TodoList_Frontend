<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue';
import {Star, StarFilled} from "@element-plus/icons-vue";
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";

const TodoStore = useTodoItemStore()
const isStared = defineModel()
const props = defineProps(['Tid'])

const handleClick = () => {
  isStared.value = !isStared.value;
  console.log("isStared.value:", isStared.value)

  setTimeout(() => {
    TodoStore.onStarTask(props.Tid, isStared.value ? 1 : 0)
  }, 1)
}

</script>

<template>
  <div class="star-button-container">
    <el-button 
        :icon="isStared ? StarFilled : Star"
        circle
        :class="{'is-starred': isStared}"
        class="star-button"
        @click="handleClick"
    />
  </div>
</template>

<style scoped>
.star-button-container {
  display: inline-block;
}

.star-button {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  border: 1px solid #e4e7ed;
  background-color: transparent;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
}

.star-button:hover {
  transform: scale(1.1);
  background-color: rgba(252, 227, 71, 0.2);
  border-color: rgba(245, 191, 17, 0.5);
  color: #f5bf11;
  box-shadow: 0 4px 12px rgba(245, 191, 17, 0.2);
}

.star-button.is-starred {
  color: #f5bf11;
  background-color: rgba(252, 227, 71, 0.2);
  border-color: rgba(245, 191, 17, 0.5);
  box-shadow: 0 4px 12px rgba(245, 191, 17, 0.2);
}

:deep(.el-icon) {
  font-size: 18px;
  transition: all 0.3s ease;
}

.star-button.is-starred :deep(.el-icon) {
  animation: star-bounce 0.5s;
}

@keyframes star-bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.4);
  }
  60% {
    transform: scale(1.2);
  }
}

@keyframes star-rotate {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(20deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(-20deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.star-button:active :deep(.el-icon) {
  animation: star-rotate 0.3s;
}
</style>