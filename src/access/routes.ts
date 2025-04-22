import { HomeOutlined , GithubOutlined} from '@ant-design/icons-vue'
import { h } from 'vue'
import HomeView from "@/views/HomeView.vue";
import UserLoginPage from "@/pages/user/UserLoginPage.vue";
import UserRegisterPage from "@/pages/user/UserRegisterPage.vue";
import UserManagePage from "@/pages/admin/UserManagePage.vue";
import ACCESS_ENUM from "@/access/accessEnum";

let PictureManagePage;
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
    path: '/admin/userManage',
    name: '图库',
    component: UserManagePage,
    meta: {
      access: ACCESS_ENUM.NOT_LOGIN,
    },
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

