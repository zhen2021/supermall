import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载模式
const Home = () => import ('../views/home/Home')
const Category = () => import ('../views/category/Category')
const Shopcart = () => import ('../views/shopcart/Shopcart')
const Profile = () => import ('../views/profile/Profile')

// 1、安装插件
Vue.use(VueRouter)

// 2、创建router
const routes = [
  {
    path: '',
    redirect: '/home',
  },
  {
    path: '/home',
    component: Home,
  },
  {
    path: '/Category',
    component: Category,
  },
  {
    path: '/Shopcart',
    component: Shopcart,
  },
  {
    path: '/Profile',
    component: Profile,
  },
]
const router = new VueRouter({
  routes,
  mode:'history'
})

// 3、导出
export default router