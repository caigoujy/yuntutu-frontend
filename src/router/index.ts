import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import UserManagePage from '@/pages/admin/UserManagePage.vue'
import UserRegisterPage from '@/pages/user/UserRegisterPage.vue'
import UserLoginPage from '@/pages/user/UserLoginPage.vue'
import AddPicturePage from "@/pages/picture/AddPicturePage.vue";
import noAuthPage from "@/access/noAuthPage.vue";
import noFoundPage from "@/access/noFoundPage.vue";
import ErrorPage from "@/access/ErrorPage.vue";
import PictureManagePage from "@/pages/admin/PictureManagePage.vue";
import PictureDetailPage from "@/pages/picture/PictureDetailPage.vue";


// 全局路由
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '主页',
      component: HomePage,
    },
    {
      path: '/user/login',
      name: '用户登录',
      component: UserLoginPage,
    },
    {
      path: '/user/register',
      name: '用户注册',
      component: UserRegisterPage,
    },
    {
      path: '/admin/userManage',
      name: '用户管理',
      component: UserManagePage,
    },
    {
      path: '/add_picture',
      name: '创建图片',
      component: AddPicturePage,
    },
    {
      path: '/admin/pictureManage',
      name: '图片管理',
      component: PictureManagePage,
    },
    {
      path: '/picture/:id',
      name: '图片详情',
      component: PictureDetailPage,
      props: true,
    },



    {
      path: '/noAuth',
      name: '无权限',
      component: noAuthPage,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: noFoundPage
    },
    {
      path: '/error',
      name: '系统错误',
      component: ErrorPage,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
