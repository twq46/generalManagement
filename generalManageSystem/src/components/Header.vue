<template>
  <el-header>
    <div class="l-content">
      <!--图标的展示 -->
        <el-icon color="white" :size="20" @click="zdStore.qf"><Menu /></el-icon>
        <h3>首页</h3>
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
import {useStore} from '@/store/index'

const zdStore = useStore()

</script>

<style scoped lang="scss">
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
