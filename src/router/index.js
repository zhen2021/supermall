import Vue from 'vue'
import VueRouter from 'vue-router'
// 获取vuex值
import store from '../store'


// 懒加载模式
const Home = () => import ('../views/home/Home')
const Category = () => import ('../views/category/Category')
const Cart = () => import ('../views/shopcart/Cart')
const Profile = () => import ('../views/profile/Profile')
const Detail = () => import ('../views/detail/Detail')
const Login = () => import ('../views/login/Login')
const Register = () => import ('../views/login/Register')


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
    path: '/category',
    component: Category,
  },
  {
    path: '/Cart',
    component: Cart,
  },
  {
    path: '/profile',
    component: Profile,
    meta: {
      needLogin:true,
    }
  },
  {
    path:'/detail/:id',
    component: Detail,
  },
  {
    path:'/login',
    component: Login,
  },
  {
    path:'/register',
    component: Register,
  }
]
const router = new VueRouter({
  routes,
  mode:'history'
})





// 3、导出
export default router