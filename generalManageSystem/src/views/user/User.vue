<template>
  <el-table :data="tableData" style="width: 100%" height="500px">
    <el-table-column
      v-for="(item,index) in tableLabel"
      :key="index"
      :prop="item.prop"
      :label="item.label"
      :width = "item.width ? item.width : 125"
    />
    <el-table-column fixed="right" label="操作" width="180">
      <template #default="scope">
        <el-button  type="primary" size="small" @click="hancleClick(scope.row)">编辑</el-button>
        <el-button  type="danger" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination @current-change="changePage" background layout="prev, pager, next" :total="configT.total" />
</template>

<script setup>
  import {getUserData} from "@/api/mockData/user"
  import {onMounted,ref,reactive} from 'vue'
  onMounted(()=>{
    getUserDataInfo(configT.value)
  })
  const configT = ref({
    total:0,
    page:1,
  })
  const tableData = ref([])
  const tableLabel = reactive([
    {
      prop:'name',
      label:'姓名'
    },
    {
      prop:'age',
      label:'年龄'
    },
    {
      prop:'sexLabel',
      label:'性别',

    },
    {
      prop:'birth',
      label:'出生日期',
      width:200,
    },
    {
      prop:'addr',
      label:'地址',
      width:320,
    },
  ])
  const changePage = (page)=>{

    configT.value.page = page
    getUserDataInfo(configT.value)
  }
  const getUserDataInfo = (config)=>{
    getUserData(config).then(res=>{
      configT.value.total = res.count
      tableData.value = res.list.map((item)=>{
        item.sexLabel = item.sex === 0 ? '女' : '男'
        return item
      })

    })
  }

</script>

<style scoped lang="scss">
.el-pagination{
  margin-top: 10px;
}
</style>
