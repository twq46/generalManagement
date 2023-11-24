<template>
  <el-header>
    <div class="l-content">
      <!--图标的展示 -->
      <el-icon color="white" :size="20" @click="zdStore.qf"><Menu /></el-icon>
      <el-breadcrumb separator="/" class="bread">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item v-if="zdStore.currentMenu" :to="zdStore.currentMenu.path">{{ zdStore.currentMenu.name }}</el-breadcrumb-item>

      </el-breadcrumb>
    </div>
    <div class="r-content">
      <!--    登录退出的展示-->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link">
          <img src="@/assets/user.png" alt="">
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-header>
</template>

<script setup>
import {useStoreData} from '@/store/index'

const zdStore = useStoreData()

</script>

<style scoped lang="scss">
.l-content{
  display: flex;
  align-items: center;
}
.bread{
  margin-left: 10px;
}

//样式穿透 .bread /deep/ span

:deep(.bread span){
  color:white !important;
  cursor: pointer !important;
}
//.bread :deep span{
//  color:white !important;
//  cursor: pointer !important;
//}
header{
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333333;
  .r-content{
    .el-dropdown-link{
      img{
        width: 30px;
        height: 30px;
        border-radius: 50%;
      }
    }
  }
}

</style>
