<template>
  <div class="common-layout">
    <el-container>
      <el-aside width="200px">Aside</el-aside>
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
</script>

<style scoped lang="scss">
.r-container{
  display: flex;
  flex-wrap: wrap;
}
</style>
