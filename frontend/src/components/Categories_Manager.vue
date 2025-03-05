<script setup lang="ts">
 import Categories_Item from "@/components/Categories_Item.vue";
 import {useAccountStore} from "@/stores/UserStore.ts";
 import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
 import {computed, onMounted, ref} from 'vue'
 import {DocumentAdd, FolderAdd, Refresh} from "@element-plus/icons-vue";
 import {addCategories, deleteCategories} from "@/net";
 import {ElMessage} from "element-plus";
 import {storeToRefs} from "pinia";

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
    ElMessage.success('成功删除标签')
    onRefresh()
    deleteDialogVisible.value = false
    deleteItem = {
      id: '',
      name: '',
      containedNum: 0
    }
  },()=>{
    ElMessage.error('删除标签失败')
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
       ElMessage.success('成功添加标签')
       onRefresh()
       newCategoryName.value = ''
       addDialogVisible.value = false
    },()=>{
       ElMessage.error('添加标签失败')
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
  <h1>Categories Page</h1>
  <div class="table-container" v-if="active" >
    <div class="refresh-btn">
<!--      添加分类按钮 -->
      <el-button  type="success"  @click="addDialogVisible=true">
        <el-icon ><DocumentAdd/></el-icon>
        Add Category
      </el-button>
<!--刷新按钮-->
      <el-button type="primary" @click="onRefresh()">
        <el-icon ><Refresh/></el-icon>
        Refresh
      </el-button>



    </div>
    <el-table :data="filterTableData" style="width: 100%" v-loading="loading">
      <el-table-column label="Category ID" prop="id" />
      <el-table-column label="Category Name" prop="name" />
      <el-table-column label="Contained Task" prop="containedNum" />
      <el-table-column align="right">
        <template #header>
          <el-input v-model="search" size="small" placeholder="Type to search by name" />

        </template>
        <template #default="scope">

<!--       删除标签按钮   -->
          <el-button
              size="small"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)"
          >
            Delete
          </el-button>


        </template>
      </el-table-column>
    </el-table>
<!--添加分类弹窗-->
    <el-dialog v-model="addDialogVisible" title="Add a Category" width="500" destroy-on-close>
      <div>
        <el-input v-model="newCategoryName" placeholder="Type Category Name" />
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="onCancel">Cancel</el-button>
          <el-button type="primary" @click="onAddCategory">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
    <!--删除分类确认弹窗-->
    <el-dialog v-model="deleteDialogVisible" title="Confirm Deletion" width="500">
      <div>
        There some tasks in this category, do you want to delete it?
      </div>

      <template #footer>
        <div class="dialog-footer">
          <el-button @click="addDialogVisible = false">Cancel</el-button>
          <el-button type="danger" @click="deleteCategory(deleteItem)">
            Delete
          </el-button>
        </div>
      </template>
    </el-dialog>

  </div>
</template>

<style scoped>

</style>