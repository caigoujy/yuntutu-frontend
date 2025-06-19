import { HomeOutlined } from '@ant-design/icons-vue'
import HomeView from "@/views/HomeView.vue";
import UserLoginPage from "@/pages/user/UserLoginPage.vue";
import UserRegisterPage from "@/pages/user/UserRegisterPage.vue";
import UserManagePage from "@/pages/admin/UserManagePage.vue";
import ACCESS_ENUM from "@/access/accessEnum";
import AddPicturePage from "@/pages/picture/AddPicturePage.vue";
import noAuthPage from "@/access/noAuthPage.vue";
import noFoundPage from "@/access/noFoundPage.vue";
import ErrorPage from "@/access/ErrorPage.vue";
import PictureManagePage from "@/pages/admin/PictureManagePage.vue";
import PictureDetailPage from "@/pages/picture/PictureDetailPage.vue";



// 权限路由
export const routes = [
  {
    path: '/',
    name: '主页',
    component: HomeView,
    meta: {
      icon: HomeOutlined,
    },
  },
  {
    path: '/user/login',
    name: '用户登录',
    component: UserLoginPage,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/user/register',
    name: '用户注册',
    component: UserRegisterPage,
    meta: {
      hideInMenu: true
    }
  },
  {
    path: '/admin/userManage',
    name: '用户管理',
    component: UserManagePage,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: '/add_picture',
    name: '创建图片',
    component: AddPicturePage,
    meta: {
      hideInMenu: true,
    }
  },
  {
    path: '/admin/pictureManage',
    name: '图片管理',
    component: PictureManagePage,
    meta: {
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: '/picture/:id',
    name: '图片管理',
    component: PictureDetailPage,
    meta: {
      hideInMenu: true,
    }
  },





  {
    path: '/noAuth',
    name: '无权限页面',
    component: noAuthPage,
    meta: {
      hideInMenu: true,
    }
  },
  {
    path: '/noFound',
    name: '404',
    component: noFoundPage,
    meta: {
      hideInMenu: true,
    }
  },
  {
    path: '/error',
    name: '500',
    component: ErrorPage,
    meta: {
      hideInMenu: true,
    }
  },
  {
    path: '/about',
    name: '关于',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue'),
  },
]
