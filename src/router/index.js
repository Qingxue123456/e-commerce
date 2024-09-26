import { createRouter, createWebHistory } from 'vue-router'

import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import Layout from '@/views/Layout/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'
import Details from '@/views/Detials/index.vue'
import CartList from '@/views/CartList/index.vue'
import Checkout from '@/views/Checkout/index.vue'
import Pay from '@/views/Pay/index.vue'
import PayBack from '@/views/Pay/PayBack.vue'
import Member from '@/views/Member/index.vue'
import UserInfo from '@/views/Member/components/UserInfo.vue'
import UserOrder from '@/views/Member/components/UserOrder.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'layout',
      component: Layout,
      children: [
        {
          path:'',
          name: 'home',
          component: Home,
        },
        {
          path:'category/:id',
          name: 'category',
          component: Category,
        },
        {
          path:'category/sub/:id',
          name: 'subCategory',
          component: SubCategory,
        },
        {
          path:'detail/:id',
          name: 'details',
          component: Details,
        },
        {
          path:'cartList',
          name: 'cartList',
          component: CartList,
        },
        {
          path:'checkout',
          name: 'checkout',
          component: Checkout,
        },
        {
          path:'pay',
          name: 'pay',
          component: Pay,
        },
        {
          path:'paycallback',
          name: 'paycallback',
          component: PayBack,
        },
        {
          path:'member',
          name: 'member',
          component: Member,
          children: [
            {
              path:'',
              name: 'userinfo',
              component: UserInfo,
            },
            {
              path:'order',
              name: 'userorder',
              component: UserOrder,
            },
            
          ]
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ],
  // 路由配置项 - 路由滚动行为定制
  scrollBehavior() {
    return { top:0 }
  }
})

export default router
