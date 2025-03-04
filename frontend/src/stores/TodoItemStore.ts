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
            // {
            //     id:'1894633242174734338',
            //     name:'Category01',
            // },
            // {
            //     id:'1894670847931105281',
            //     name:'Category02',
            // },
            // {
            //     id:'1894647966497030145',
            //     name:'Category03',
            // },
        ] as Array<CategoryInterface>,
    })
    const UserContentInit=()=>{

        fetchCategories((response:any)=>{
            console.info("UserContentInit")

            UserContent.categories=response;

            console.log(UserContent.categories)
            setTimeout(()=>{
                InitMap()
                console.log("***",CategoriesMap)
            },10)
            for(const item of UserContent.categories){
                item.containedNum = CategoriesMap.get(item.name)?CategoriesMap.get(item.name):0
                console.log(CategoriesMap.get(item.name))
            }
            console.info("!%%!%!",UserContent.categories)
        },()=>{
            ElMessage.error("获取分类失败")
        })

    }

    const InitMap=()=>{
        CategoriesMap.clear()
        console.log("TT",TodoItems.items)
        for (const item of TodoItems.items) {
            console.log("TT",item.category)
            if(!CategoriesMap.has(item.category)){
                CategoriesMap.set(item.category,0)
            }
                CategoriesMap.set(item.category,CategoriesMap.get(item.category)+1)
        }
        console.log("%$%^$^",CategoriesMap)
    }

    const queryAll = () => {
         fetchTasks(
             (response:any) => {
                 TodoItems.items = response
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