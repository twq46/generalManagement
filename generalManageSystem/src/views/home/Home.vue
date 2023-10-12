<template>
  <!-- gutter：列之间的间距  -->
  <el-row class="home" :gutter="20">
    <el-col :span="8" style="margin-top:20px">
      <el-card shadow="hover">
        <!--用户信息-->
        <div class="user">
          <img src="../../assets/user.png" alt="">
          <div class="userinfo">
            <p class="name">Admin</p>
            <p class="role">超级管理员</p>
          </div>
        </div>
        <!--登录信息-->
        <div class="login-info">
          <p>上次登录时间：<span>2022-7-11</span></p>
          <p>上次登录地点：<span>北京</span></p>
        </div>
      </el-card>
      <el-card shadow="hover" class="secondcard">
        <el-table :data="tableData">
          <el-table-column v-for="(item,i) in tableLabel" :prop="i" :label="item" width="80" />
        </el-table>
      </el-card>
    </el-col>
    <el-col :span="16" style="margin-top:20px">
      456
    </el-col>
  </el-row>
</template>

<script setup>
import {ref} from 'vue'
const tableLabel={
  name:'课程',
  todayBuy:'今日购买',
  monthBuy:'本月购买',
  totalBuy:'总计购买'
}
const tableData = ref([
  {
    name:'oppo',
    todayBuy:500,
    monthBuy:3500,
    totalBuy:22000,
  },
  {
    name:'vivo',
    todayBuy: 300,
    monthBuy:2200,
    totalBuy:24000,
  },
  {
    name:'apple',
    todayBuy:800,
    monthBuy:4500,
    totalBuy:32000,
  },
  {
    name:'小米',
    todayBuy:800,
    monthBuy:5500,
    totalBuy:42000,
  },
])

</script>

<style scoped lang="scss">
.home{
  .user{
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;
    margin-bottom:20px;
    img{
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 20px;
    }
  }
  .login-info{
    p{
      line-height: 30px;
      font-size: 14px;
      span{
        margin-left: 60px;
      }
    }
  }

  .secondcard{
    margin-top: 20px;

    height: 360px;
  }
}
</style>
