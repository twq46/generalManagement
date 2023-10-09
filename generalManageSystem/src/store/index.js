import {defineStore} from "pinia";
import {ref} from 'vue'

export const useStore = defineStore('zd',()=>{
  const isCollapse = ref(false)
  const qf = ()=>{
    isCollapse.value = !isCollapse.value
  }
  return{
    isCollapse,
    qf
  }
})
