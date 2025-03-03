//该组件暂时弃用

// import {defineStore} from "pinia";
// import {reactive} from "vue";
// import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
//
// export const useTaskInfoFormStore = defineStore('taskInfoForm', () => {
//     const InfoForm = reactive({
//         title: '',
//         detail: '',
//         deadline: '',
//         tags: [] as string[],
//         category: '',
//         isStared: false,
//     })
//     const FormInit = (index:number) => {
//         const taskList = useTodoItemStore().TodoItems.items
//         const task= taskList[index]
//         console.log("@@@@",index)
//         // InfoForm.title = task.Title
//         // InfoForm.detail = task.Description
//         // InfoForm.deadline = task.Deadline
//         // InfoForm.tags =task.Tags as string[]
//         // InfoForm.category = task.Category
//         // InfoForm.isStared = task.isStared
//     }
//     return { InfoForm,FormInit }
// })