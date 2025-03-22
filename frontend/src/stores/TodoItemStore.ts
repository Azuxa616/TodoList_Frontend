import {defineStore, mapActions} from 'pinia'
import {ref, reactive, watch} from 'vue'
import {
    fetchTasks,
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

interface CategoryInterface {
    id: string;
    name: string;
    containedNum: number;
}

export const useTodoItemStore = defineStore('TodoItems', () => {


    const TodoItems = reactive({
        items: [

        ] as Array<TodoItemInterface>,
        itemCount: 0
    })

    const CategoriesMap = reactive(new Map<string,any> ([
        ])
    )

    const UserContent=reactive({
        categories:[

        ] as Array<CategoryInterface>,
    })
    const UserContentInit=()=>{

        fetchCategories((response:any)=>{

            UserContent.categories=response;


            setTimeout(()=>{
                InitMap()
            },10)
            for(const item of UserContent.categories){
                item.containedNum = CategoriesMap.get(item.name)?CategoriesMap.get(item.name):0

            }
        },()=>{
            ElMessage.error("获取分类失败")
        })

    }

    const InitMap=()=>{
        CategoriesMap.clear()
        for (const item of TodoItems.items) {
            if(!CategoriesMap.has(item.category)){
                CategoriesMap.set(item.category,0)
            }
                CategoriesMap.set(item.category,CategoriesMap.get(item.category)+1)
        }
    }

    watch(TodoItems.items,()=>{
        TodoItems.items.forEach((item:any) => {
            item.tags = item.tags.split(",")
        })
    })

    const queryAll = () => {
         fetchTasks(
             (response:any) => {
                 TodoItems.items = response
                 TodoItems.items.forEach((item:any) => {
                    //  console.log(item.title,item.tags.split(","))
                     item.tags = item.tags?item.tags.split(","):[]
                 })
                 console.log("TodoItems.items:",TodoItems.items)
                 InitMap()
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

    return {TodoItems,UserContent ,CategoriesMap, queryAll ,onStarTask,onCompleteTask,UserContentInit,InitMap}
})