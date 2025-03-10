import {defineStore} from "pinia";
import {reactive} from "vue";
import { useTodoItemStore } from "../TodoItemStore";
import {addTask} from "@/net";
import {ElMessage} from "element-plus";
export const useTaskFormStore = defineStore('addTaskForm', () => {
    const AddTaskForm = reactive({
            title: '',
            detail: '',
            deadline: '',
            tags: [] as Array<string>,
            category: '',
            isStared: false,
        })
    const submitForm = () => {
        console.log(!AddTaskForm!)
        const todoItemStore= useTodoItemStore()
        addTask(
            AddTaskForm.title,
            AddTaskForm.detail,
            AddTaskForm.deadline,
            AddTaskForm.category,
            AddTaskForm.tags,
            ()=>{
                ElMessage.success('添加成功')
                todoItemStore.queryAll()
            }
            )
        initForm()
    }
    const initForm = () => {
        AddTaskForm.title = ''
        AddTaskForm.detail = ''
        AddTaskForm.deadline = ''
        AddTaskForm.category = ''
        AddTaskForm.isStared = false
        AddTaskForm.tags = []
    }
    return { AddTaskForm,submitForm ,initForm }
})