import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import {fetchTasks} from "@/net";

interface TodoItemInterface {
    id: number;
    userid: string
    title: string
    description: string
    status: boolean
    star: boolean
    dueDate: string
    createTime: string
    category: string
    tags: string[]
}


export const useTodoItemStore = defineStore('TodoItems', () => {


    const TodoItems = reactive({
        items: [

        ] as Array<TodoItemInterface>,
        itemCount: 0
    })

    const queryAll = () => {
         fetchTasks(
             (response:any) => {
                 TodoItems.items = response
                 console.log("TodoItems.items:",TodoItems.items)
             },
             (error:any) => {
                 console.log("error:",error)
             }
         )
    }

    return {TodoItems , queryAll }
})