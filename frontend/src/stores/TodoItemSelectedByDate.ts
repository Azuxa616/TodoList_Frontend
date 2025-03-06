import {defineStore, mapActions} from 'pinia'
import {ref, reactive, watch} from 'vue'
import {
    fetchTasksByDate,
    starTask,
    unstarTask,
    completeTask,
    uncompleteTask, getUserInfo, deleteAccessToken, fetchCategories,
} from "@/net";
import {ElMessage} from "element-plus";
import router from "@/router";

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

export const useDataSelectedItemStore = defineStore('TodoItems_SelectedByDate', () => {

    const isSelected=ref(false)

    const SelectedTodoItems = reactive({
        items: [

        ] as Array<TodoItemInterface>,
        itemCount: 0
    })

    const selectByDate = (date:string) => {
        fetchTasksByDate(date,(response:any)=>{
            SelectedTodoItems.items=response
            ElMessage.success("查询成功")
            console.log("获取任务成功",response)
        },(response:any)=>{
            console.log("获取任务失败",response)
        })
    }

    // const onStarTask = (id:number, star:number) => {
    //     if(star==1){
    //         starTask(
    //             id,
    //             ()=>{
    //                 console.log("star success!")
    //                 queryAll()
    //             },
    //             (error:any) => {
    //                 console.log("star failure!")
    //                 queryAll()
    //             }
    //         )
    //     }else{
    //         unstarTask(
    //             id,
    //             ()=>{
    //                 console.log("unstar success!")
    //                 queryAll()
    //             },
    //             ()=>{
    //                 console.log("unstar failure!")
    //                 queryAll()
    //             })
    //     }
    //
    // }
    //
    // const onCompleteTask = (id:number, done:number) => {
    //     if(done==1){
    //         completeTask(
    //             id,
    //             ()=>{
    //                 console.log("complete success!")
    //                 queryAll()
    //             },
    //             () => {
    //                 console.log("complete failure!")
    //                 queryAll()
    //             })
    //     }else{
    //         uncompleteTask(
    //             id,
    //             ()=>{
    //                 console.log("uncomplete success!")
    //                 queryAll()
    //             },()=>{
    //                 console.log("uncomplete failure!")
    //                 queryAll()
    //             }
    //
    //         )
    //     }
    // }

    return {SelectedTodoItems,isSelected ,selectByDate,}
})