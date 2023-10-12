<template>
  <div class="common-layout">
    <el-container>
      <Aside></Aside>
      <el-container class="r-container">
        <Header></Header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>


</template>

<script setup>
import Header from "../components/Header.vue";
import Aside from "../components/Aside.vue";
</script>

<style scoped lang="scss">
.r-container{
  display: flex;
  flex-wrap: wrap;
}
.el-container{
  display: flex;
  flex-wrap: wrap;
  //基准线
  align-items: flex-start;
}
.common-layout{
  height: 100%;
  & > .el-container{
    height: 100%;

    & > .el-aside{
      height: 100%;
      background-color: #545c64;
    }
  }
}
</style>
