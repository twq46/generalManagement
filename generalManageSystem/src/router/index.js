import {createRouter,createWebHashHistory} from "vue-router";

const routes =[
  {
    path:'/',
    component:()=> import('../views/Main.vue'),
    children:[
      {
        path:'',
        component:() => import('../views/home/Home.vue')
      }
    ]
  }
]

const router = createRouter({
  history:createWebHashHistory(),
  routes
})

export default router
