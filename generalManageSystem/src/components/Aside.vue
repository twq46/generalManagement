<template>
    <el-aside :width="zdStore.isCollapse ? '64px':'180px'">
      <el-menu
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          :collapse="zdStore.isCollapse" :collapse-transition="false">
        <h3 v-show="!zdStore.isCollapse">后台管理系统</h3>
        <h3 v-show="zdStore.isCollapse">后台</h3>
        <el-menu-item
            :index="item.path"
            v-for="item in noChildren()"
            :key="item.path" @click="clickMenu(item)">
<!--          <el-icon><icon-menu /></el-icon>-->
          <!--动态引入icon-->
          <el-icon>
            <component class="icons" :is="item.icon"></component>
          </el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
        <el-sub-menu :index="item.label" v-for="item in hasChildren()" :key="item.label">
          <template #title>
            <el-icon>
              <component class="icons" :is="item.icon"/>
            </el-icon>
            <span>{{item.label}}</span>
          </template>
          <el-menu-item-group >
            <el-menu-item
                :index="subItem.path"
                v-for="(subItem,subIndex) in item.children"
                :key="subIndex" @click="clickMenu(subItem)">
              <el-icon>
                <component class="icons" :is="subItem.icon"/>
              </el-icon>
              <span>{{subItem.label}}</span>
            </el-menu-item>

          </el-menu-item-group>

          <el-sub-menu index="1-4">
            <template #title>item four</template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-sub-menu>
        </el-sub-menu>

      </el-menu>
    </el-aside>
</template>

<script setup>
import {useStoreData} from "@/store/index";
import {useRouter} from 'vue-router'
const zdStore = useStoreData()
const list =[
  {
    path:'/user',
    name:'user',
    label:'用户管理',
    icon:'user',
    url:'UserManage/UserManage'
  },
  {
    label:'其他',
    icon:'location',
    children:[
      {
        path:'/page1',
        name:'page1',
        label:'页面1',
        icon:'setting',
        url:'Other/PageOne'
      },
      {
        path:'/page2',
        name:'page2',
        label:'页面2',
        icon:'setting',
        url:'Other/PageTwo'
      }
    ]
  }
]

const noChildren = () => {
  return list.filter((item) => !item.children)
}

const hasChildren = () => {
  return list.filter((item) => item.children)
}

const router = useRouter()
const clickMenu = (item) => {
  console.log(item)
  router.push({
    name:item.name,
  })
  //pinia管理
  zdStore.selectMenu(item)
}
</script>

<style scoped lang="scss">
.icons{
  width: 18px;
  height: 18px;
}

.el-menu{
  h3{
    border-right: none;
    color: white;
    line-height: 35px;
    text-align: center;
  }

}
</style>
