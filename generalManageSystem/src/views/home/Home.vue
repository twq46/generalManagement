<template>
  <!-- gutter：列之间的间距  -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item
    ><a href="/">promotion management</a></el-breadcrumb-item
    >
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
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
      <div class="num">
        <el-card
            :body-style="{display:'flex',padding:0}"
            v-for="item in countData"
            :key="item.name">
            <component
                class="icons"
                :is="item.icon"
                :style="{background:item.color}"></component>
            <div class="details">
              <p class="numvalue">¥{{item.value}}</p>
              <p class="txt">{{item.name}}</p>
            </div>
        </el-card>
      </div>
      <el-card style="height: 280px">
        <div class="echart" style="height: 280px"></div>
      </el-card>
      <div class="graph">
        <!-- 柱状图-->
        <el-card style="height: 260px" class="userflex mr">
          <div class="userechart" style="height: 240px"></div>
        </el-card>
        <!-- 饼状图-->
        <el-card style="height: 260px" class="userflex">
          <div class="videoechart" style="height: 240px"></div>
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script setup>
import {ref,onMounted,reactive} from 'vue'
import {getData,getTableData,getCountInfo,getChartData} from "@/api/mockData/home.js";
import axios from "axios";
import * as echarts from 'echarts'
const tableLabel={
  name:'课程',
  todayBuy:'今日购买',
  monthBuy:'本月购买',
  totalBuy:'总计购买'
}
let tableData = ref([])
let countData = ref([])
let xOptions = reactive({
  legend: {
    // 图例文字颜色
    textStyle: {
      color: "#333",
    },
  },
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#000",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#d87a80", "#8d98b3"],
  series: [],
})
let pieOptions = reactive({
  legend: {
    // 图例文字颜色
    textStyle: {
      color: "#333",
    },
  },
  grid: {
    left: "20%",
  },
  // 提示框
  tooltip: {
    trigger: "axis",
  },
  xAxis: {
    type: "category", // 类目轴
    data: [],
    axisLine: {
      lineStyle: {
        color: "#17b3a3",
      },
    },
    axisLabel: {
      interval: 0,
      color: "#333",
    },
  },
  yAxis: [
    {
      type: "value",
      axisLine: {
        lineStyle: {
          color: "#17b3a3",
        },
      },
    },
  ],
  color: ["#2ec7c9", "#b6a2de"],
  series: [],
})
//折线图
let orderData = reactive({
  xData:[],
  series:[]
});
//柱状图
let userData = reactive({
  xData:[],
  series:[]
})
//饼状图
let videoData = reactive({
  series:[]
})
onMounted(()=>{
  getCountInfoData()
  getChartDataT()
})
const getCountInfoData = ()=>{
  getCountInfo().then(res =>{
    countData.value = res.data
  })
}
const getChartDataT = ()=>{
  getChartData().then(res =>{
    console.log(res)
    tableData.value = res.tableData.data
    let result = res.orderData
    let userRes = res.userData
    let videoRes = res.videoData
    orderData.xData = result.date//拿到折线图的横坐标
    const keyArray = Object.keys(result.data[0])//获取第一个对象的所有键

    const series = []
    keyArray.forEach((key)=>{//处理series数据
      series.push({
        name:key,
        data:result.data.map(item=>item[key]),
        type:'line'
      })
    })
    orderData.series = series
    xOptions.xAxis.data = orderData.xData
    xOptions.series = orderData.series
    //折线图进行渲染
    let hEcharts = echarts.init(document.querySelector('.echart'))
    hEcharts.setOption(xOptions)

    //柱状图进行渲染
    userData.xData = userRes.data.map(item => item.date)
    userData.series = [
      {
        name:'新增用户',
        data:userRes.data.map(item => item.new),
        type:'bar'
      },
      {
        name:'活跃用户',
        data:userRes.data.map(item => item.active),
        type:'bar'
      },
    ]
    xOptions.xAxis.data = userData.xData
    xOptions.series = userData.series
    let userChart = echarts.init(document.querySelector('.userechart'))
    userChart.setOption(xOptions)

    //饼状图
    videoData.series = [
      {
        data:videoRes.data,
        type:'pie'
      }
    ]
    pieOptions.series = videoData.series
    let pieChart = echarts.init(document.querySelector('.videoechart'))
    pieChart.setOption(pieOptions)
    window.addEventListener("resize",function (){
      hEcharts.resize()
      userChart.resize()
      pieChart.resize()
    })
  })
}




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
  .num{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card{
      width: 32%;
      margin-bottom: 20px;

    }
    .icons{
      width: 80px;
      height: 80px;
      font-size: 30px;
      text-align: center;
      line-height: 80px;
      color: white;
    }
    .details{
      display: flex;
      margin-left: 15px;
      flex-direction: column;
      text-align: center;
      align-items: center;
      .numvalue{
        font-size: 25px;
        margin-bottom: 10px;
      }
      .txt{
        font-size: 14px;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph{
    display: flex;
    margin-top: 20px;
    .mr{
      margin-right: 10px;
    }
    .userflex{
      flex: 1;
    }
  }
}

</style>
