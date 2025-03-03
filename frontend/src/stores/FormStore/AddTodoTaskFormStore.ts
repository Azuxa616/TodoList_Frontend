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
            tags: [],
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
                //todo:显示任务（假更新），需要查询api
                todoItemStore.queryAll()
                // todoItemStore.TodoItems.items.push({
                //     Tid:Math.random().toString(36),
                //     Title: AddTaskForm.title,
                //     Description: AddTaskForm.detail,
                //     Deadline: AddTaskForm.deadline,
                //     Category: AddTaskForm.category,
                //     Tags: AddTaskForm.tags,
                //     isDone: false,
                //     isStared: AddTaskForm.isStared
                // })
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