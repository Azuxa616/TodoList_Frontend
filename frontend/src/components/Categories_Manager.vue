<script setup lang="ts">
 import Categories_Item from "@/components/Categories_Item.vue";
 import {useAccountStore} from "@/stores/UserStore.ts";
 import {useTodoItemStore} from "@/stores/TodoItemStore.ts";
 import {computed, onMounted, ref} from 'vue'
 import {Refresh} from "@element-plus/icons-vue";

 // const AccountStore = useAccountStore();
 // const Categories=AccountStore.UserContent.categories
 const TodoStore = useTodoItemStore();
 const CategoriesMap=TodoStore.CategoriesMap
 const  Categories=TodoStore.UserContent.categories

 let active=ref(false);
 let loading=ref(true);

 interface CategoryInterface {
    id: string;
    name: string;
    containedNum: number;
 }

 const search = ref('')
 const filterTableData = computed(() =>
     Categories.filter(
         (data) =>
             !search.value ||
             data.name.toLowerCase().includes(search.value.toLowerCase())
     )
 )

 const handleDelete = (index: number, row: CategoryInterface) => {
   console.log(index, row)

 }
 const onRefresh = () => {
   active.value = false
   loading.value = true
   setTimeout(()=>{
     TodoStore.queryAll()
     active.value = true
     setTimeout(()=>{
        TodoStore.UserContentInit()
        loading.value = false
     },100)
       },10
   )

 }

 // let tableData = [
 //   {
 //     id:'1894633242174734338',
 //     name:'Category01',
 //   },
 //   {
 //     id:'1894670847931105281',
 //     name:'Category02',
 //   },
 //   {
 //     id:'1894647966497030145',
 //     name:'Category03',
 //   },
 // ] as CategoryInterface[];

 //初始化
 onMounted(() => {
   TodoStore.queryAll()
   setTimeout(()=>{
     TodoStore.UserContentInit()
     setTimeout(()=>{
       active.value = true
       loading.value = false
     },100)
   },100)
 })

</script>

<template>
  <h1>Categories Page</h1>
  <div class="table-container" v-if="active" >
    <div class="refresh-btn">
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
<!--          <el-button size="small" @click="handleEdit(scope.$index, scope.row)">-->
<!--            Edit-->
<!--          </el-button>-->

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
  </div>
</template>

<style scoped>

</style>