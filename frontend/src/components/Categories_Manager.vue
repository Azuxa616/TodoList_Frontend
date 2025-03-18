<script setup lang="ts">

 import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
 import {computed, onMounted, ref} from 'vue'
 import {DocumentAdd, FolderAdd, Refresh} from "@element-plus/icons-vue";
 import {addCategories, deleteCategories} from "@/net";
 import {ElMessage} from "element-plus";
 import {storeToRefs} from "pinia";
 import AddCategory_Dialog from "@/components/AddCategory_Dialog.vue";

 const TodoStore = useTodoItemStore();
 const CategoriesMap=TodoStore.CategoriesMap
 const Categories:Array<CategoryInterface> =TodoStore.UserContent.categories

let test =true

 let active=ref(false);
 let loading=ref(true);

 const newCategoryName = ref('')
 const deleteDialogVisible=ref(false);
 const addDialogVisible=ref(false);
 let deleteItem: CategoryInterface

 interface CategoryInterface {
    id: string;
    name: string;
    containedNum: number;
 }

 const search = ref('')
 const filterTableData = computed(() => TodoStore.UserContent.categories.filter(
         (data) =>
             !search.value ||
             data.name.toLowerCase().includes(search.value.toLowerCase())
     )
 )

 const handleDelete = (index: number, row: CategoryInterface) => {

   if(row.containedNum==0){
     deleteCategory(row)
   }else{
     deleteItem = row
     deleteDialogVisible.value = true
   }
 }

 const deleteCategory = (item: CategoryInterface) => {
  deleteCategories([item.name],()=>{
    ElMessage.success('成功删除分类')
    onRefresh()
    deleteDialogVisible.value = false
    deleteItem = {
      id: '',
      name: '',
      containedNum: 0
    }
  },()=>{
    ElMessage.error('删除分类失败')
  })
 }

 //刷新
 const onRefresh = () => {
   active.value = false
   loading.value = true
   TodoStore.CategoriesMap.clear()
   setTimeout(()=>{
     TodoStore.queryAll()
     active.value = true
     setTimeout(()=>{
        TodoStore.UserContentInit()
       console.log(Categories)
        loading.value = false
     },10)
       },10
   )
   console.log("TEST",)
 }

 //初始化
 onMounted(() => {
   TodoStore.queryAll()
   setTimeout(()=>{
     TodoStore.UserContentInit()
     setTimeout(()=>{
       active.value = true
       loading.value = false
     },10)
   },10)
 })

 //添加分类
 const onAddCategory = () => {
   if (newCategoryName.value) {
    addCategories([newCategoryName.value],()=>{
       ElMessage.success('成功添加分类')
       onRefresh()
       newCategoryName.value = ''
       addDialogVisible.value = false
    },()=>{
       ElMessage.error('添加分类失败')
    })
   }
    addDialogVisible.value = false
 }
 const onCancel = () => {
   addDialogVisible.value = false
   deleteDialogVisible.value = false
   newCategoryName.value = ''
 }
</script>

<template>
  <div class="title-box"><span class="title">分类管理</span></div>
  <el-divider class="separator" />
  <div class="table-container" v-if="active" >
    <div class="btn-box">
      <AddCategory_Dialog > <el-icon ><DocumentAdd/></el-icon>添加分类</AddCategory_Dialog>
      <div class="separator-box"></div>
      <el-button type="primary" @click="onRefresh()">
        <el-icon ><Refresh/></el-icon>
      </el-button>
    </div>

    <el-table :data="filterTableData" style="width: 100%" v-loading="loading">
      <el-table-column label="分类ID" prop="id" />
      <el-table-column label="分类名称" prop="name" />
      <el-table-column label="包含任务数" prop="containedNum" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="按名称搜索" />
        </template>
        <template #default="scope">
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog v-model="deleteDialogVisible" title="确认删除" width="500">
      <div>
        该分类中还有任务，确定要删除吗？
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addDialogVisible = false">取消</el-button>
          <el-button type="danger" @click="deleteCategory(deleteItem)">
            删除
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
  .separator-box{
    width: 10px;
  }
  .btn-box{
    display: flex;
    justify-content: flex-end;
    margin-right: 2%;
  }
  .separator {
    margin: 5px 0;
  }
  .title{
    text-align: center;
    font-weight: bold;
    font-size: 40px;
    color: #343434;
  }
  .title-box{
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;

  }
</style>