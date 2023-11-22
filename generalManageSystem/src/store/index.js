import {defineStore} from "pinia";
import {ref} from 'vue'
//defineStore返回的还是一个方法，因此useStore也是一个方法，所以得通过调用useStore方法获取store对象
export const useStoreData = defineStore('zd',()=>{
  //数据(state)
  const isCollapse = ref(false)
  //修改数据的方法(mutation)
  const qf = ()=> {
    isCollapse.value = !isCollapse.value
  }
  const currentMenu = ref(null)
  const selectMenu = (val)=> {
    //判断
    if(val.name == 'home'){
      currentMenu.value = null
    }else{
      currentMenu.value = val
      let result = tabsList.value.findIndex(item => item.name === val.name)
      result == -1 ? tabsList.value.push(val) : ''
    }
  }
  const tabsList = ref([
    {
      path:'/',
      name:'home',
      label:'首页',
      icon:'home'
    }
  ])
  const closeTagItem = (tag,index)=>{
    let result = tabsList.value.findIndex(item=>item.name === tag.name)
    tabsList.value.splice(result,1)
  }
  return{
    isCollapse,
    qf,
    currentMenu,
    selectMenu,
    tabsList,
    closeTagItem
  }
})
