<template>
  <div class="tags">
    <el-tag
        v-for="(item,index) in storeData.tabsList"
        :key="index"
        :closable="item.name !== 'home'"
        :disable-transitions="false"
        :effect="$route.name === item.name ? 'dark' : 'plain'"
        @click="changeMenu(item)" @close="closeTag(item,index)">
        {{item.label}}
    </el-tag>
  </div>
</template>

<script setup>
  import {useStoreData} from '@/store/index'
  import router from "@/router";
  import {useRoute} from "vue-router";
  const storeData = useStoreData()
  const route = useRoute()
  const changeMenu = (item)=>{
    router.push({
      name:item.name
    })
    storeData.selectMenu(item)
  }
  const closeTag = (val,index)=>{
    //处理vuex中的tabsList
    console.log(route.name,val.name)
    storeData.closeTagItem(val)
    if(val.name !== route.name){//删除的标签不是当前页面，直接删除即可
      return;
    }
    if(val.name === route.name){//删除的是当前的页面，则需要进行页面的跳转
      router.push({
        name:storeData.tabsList[index - 1].name
      })
    }
  }
</script>

<style scoped lang="scss">
.tags{
  width: 100%;
  padding: 20px;
  .el-tag{
    margin-right: 15px;
    cursor: pointer;
  }
}
</style>
