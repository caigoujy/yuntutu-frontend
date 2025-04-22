<template>
  <div id="globalHeader">
    <!--    :wrap="false" 关闭自动换行-->
    <a-row :wrap="false">
      <a-col flex="200px">
        <RouterLink to="/">
          <div class="title-bar">
            <img class="logo" src="../assets/logo.png" alt="logo" />
            <div class="title">云图库</div>
          </div>
        </RouterLink>
      </a-col>
      <a-col flex="auto">
        <a-menu
          v-model:selectedKeys="current"
          mode="horizontal"
          :items="menus"
          @click="doMenuClick"
        />
      </a-col>
      <a-col flex="200px">
        <div class="user-login-status">
          <div v-if="loginUserStore.loginUser.id">
            <a-dropdown>
              <ASpace>
                <a-avatar :src="loginUserStore.loginUser.userAvatar">
                  <template #icon>
                    <UserOutlined />
                  </template>
                </a-avatar>
                {{ (loginUserStore.loginUser.userName?.trim() || '无名' )}}
              </ASpace>
              <template #overlay>
                <a-menu>
                  <a-menu-item @click="doLogout">
                    <LogoutOutlined />
                    退出登录
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </div>

          <div v-else>
            <a-button type="primary" href="/user/login">登录</a-button>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
import { computed, h, ref } from 'vue'
import { HomeOutlined } from '@ant-design/icons-vue'
import { MenuProps, message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import { UserOutlined } from '@ant-design/icons-vue'
import { logoutUserUsingPost } from '@/api/userController'
import checkAccess from '@/access/checkAccess'
import { routes } from  '@/access/routes'

const loginUserStore = useLoginUserStore()
const router = useRouter()
// 当前要高亮的菜单项
const current = ref<string[]>([])
// 监听路由变化，更新高亮菜单项
router.afterEach((to, from, next) => {
  current.value = [to.path]
})
// 路由跳转事件
const doMenuClick = ({ key }: { key: string }) => {
  router.push({
    path: key,
  })
}

// 退出登录
const doLogout = async () => {
  try {
    const res = await logoutUserUsingPost()
    if (res.data.code === 0) {
      loginUserStore.setLoginUser({
        userName: '未登录',
      })
      message.info('退出登录成功！')
      await router.push('/user/login')
    } else {
      message.error('退出登录失败，' + res.data.message)
    }
  } catch (e) {
    message.error('退出登录失败，' + e.message)
  }
}

// 未经过滤的菜单项
// const originItems = [
//   {
//     key: '/',
//     icon: () => h(HomeOutlined),
//     label: '主页',
//     title: '主页',
//   },
//   {
//     key: '/admin/userManage',
//     label: '用户管理',
//     title: '用户管理',
//   },
//   {
//     key: 'others',
//     label: h('a', { href: 'http://localhost:5173', target: '_blank' }, '图库'),
//     title: '图库',
//   },
// ]

// 把路由项转换为菜单项
const menuToRouteItem = (item: any) => {
  const isHome = item.path === '/'
  return {
    key: item.path,
    label: item.name,
    title: item.name,
    icon: isHome ? h(item.meta?.icon ?? HomeOutlined) : undefined, // 仅在主页路径时显示 icon
  }
}

// 过滤菜单项
const items = computed(() => {
  return routes
    .filter((item) => {
      if (item.meta?.hideInMenu) {
        return false
      }
      // 根据权限过滤菜单，有权限则返回 true，则保留该菜单
      return checkAccess(loginUserStore.loginUser, item.meta?.access as string)
    })
    .map(menuToRouteItem) // 转换为菜单项格式
})

const menus = ref<MenuProps['items']>(items)

/*//根据权限过滤菜单项
const filterMenus = (menus = [] as MenuProps['items']) => {
  // 遍历菜单项
  return menus?.filter((menu) => {
    // 菜单以admin开头
    if (menu?.key?.startsWith('/admin')) {
      const loginUser = loginUserStore.loginUser
      // 用户信息为空或者登录用户角色不是admin
      if (!loginUser || loginUser.userRole !== 'admin') {
          return false
      }
    }
    return true
  })
}*/
// 过滤初始菜单项 利用computed生成响应式数据，当originItems发生变化时，items会自动计算出最新的菜单项集合
// const items = computed<MenuProps['items']>(()=>filterMenus(originItems))
</script>

<style scoped>
#globalHeader .title-bar {
  display: flex;
  align-items: center;
}

.title {
  color: black;
  font-size: 18px;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
