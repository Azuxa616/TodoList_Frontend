import { defineStore } from 'pinia'
import {ref, reactive, watch} from 'vue'
import {fetchTasks ,
        starTask,
        unstarTask,
        completeTask,
        uncompleteTask,} from "@/net";

interface TodoItemInterface {
    id: number;
    userid: string
    title: string
    description: string
    status: number
    star: number
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

    const onStarTask = (id:number, star:number) => {
        if(star==1){
            starTask(
                id,
                ()=>{
                    console.log("star success!")
                    queryAll()
                },
                (error:any) => {
                    console.log("star failure!")
                    queryAll()
                }
                )
        }else{
            unstarTask(
                id,
                ()=>{
                    console.log("unstar success!")
                    queryAll()
                },
                ()=>{
                    console.log("unstar failure!")
                    queryAll()
                })
        }

    }

    const onCompleteTask = (id:number, done:number) => {
        if(done==1){
            completeTask(
                id,
                ()=>{
                    console.log("complete success!")
                    queryAll()
                },
                () => {
                    console.log("complete failure!")
                    queryAll()
                })
        }else{
            uncompleteTask(
                id,
                ()=>{
                    console.log("uncomplete success!")
                    queryAll()
                },()=>{
                    console.log("uncomplete failure!")
                    queryAll()
                }

            )
        }
    }

    return {TodoItems , queryAll ,onStarTask,onCompleteTask}
})