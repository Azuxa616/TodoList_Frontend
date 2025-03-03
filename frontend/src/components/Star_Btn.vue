<script setup lang="ts">
import {ref, reactive, onMounted} from 'vue';
import {Star, StarFilled} from "@element-plus/icons-vue";
import {useTodoItemStore} from "@/stores/TodoItemStore.ts";

const TodoStore = useTodoItemStore()
const isStared = defineModel()
const props = defineProps(['Tid'])

const icon = ref()
onMounted(() => {
  icon.value = isStared.value ? StarFilled :Star ;
})


const handleClick = () => {
  isStared.value = !isStared.value;
  console.log("isStared.value:",isStared.value)

  setTimeout(() => {
    TodoStore.onStarTask(props.Tid, isStared.value ? 1 :0)
    icon.value = isStared.value ? StarFilled :Star ;
  },1)
}

</script>

<template>
  <el-button  :icon="icon"
              circle
              id="star-btn"
              :class=" {'Stared':isStared }"
              class="star-btn"
              @click="handleClick"
              />
</template>

<style scoped>

 .Stared {
    color: #f5bf11;
    background-color: rgba(234, 204, 49, 0.2);
   border-color: rgb(255, 196, 0);
   }
   .star-btn:hover {
     background-color: rgb(252, 227, 71);
      border-color: rgba(255, 196, 0, 0.25);
     color: rgb(255, 255, 255);
   }
</style>