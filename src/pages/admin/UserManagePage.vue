<template>
  <!--  搜索组件-->
  <div id="userManagePaga">
    <a-form
      layout="inline"
      :model="searchParams"
      @finish="doSearch"
      style="margin-bottom: 20px; margin-top: 10px; margin-left: 50px"
    >
      <a-form-item label="账号">
        <a-input v-model:value="searchParams.userAccount" placeholder="输入账号" allow-clear />
      </a-form-item>
      <a-form-item label="用户名">
        <a-input v-model:value="searchParams.userName" placeholder="输入用户名" allow-clear />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" html-type="submit">搜索</a-button>
      </a-form-item>
    </a-form>
    <!--     表单-->
    <a-table
      :columns="columns"
      :data-source="dataList"
      :pagination="pagination"
      @change="doTableChange"
      class="table"
    >
      <template #headerCell="{ column }">
        <template v-if="column.key === 'name'">
          <span>
            <smile-outlined />
            Name
          </span>
        </template>
      </template>

      <template #bodyCell="{ column, record }">
        <template v-if="column.dataIndex === 'userAvatar'">
          <a-image :src="record.userAvatar" width="60px" />
        </template>
        <template v-if="column.dataIndex === 'userRole'">
          <div v-if="record.userRole === 'admin'">
            <a-tag color="red">管理员</a-tag>
          </div>
          <div v-else-if="record.userRole === 'user'">
            <a-tag color="blue">普通用户</a-tag>
          </div>
          <div v-else-if="record.userRole === 'vip'">
            <a-tag color="green">会员用户</a-tag>
          </div>
        </template>
        <template v-else-if="column.dataIndex === 'createTime'">
          {{ dayjs(record.createTime).format('YYYY-MM-DD HH:mm:ss') }}
        </template>
        <template v-else-if="column.key === 'action'">
          <a-button danger @click="doDelete(record.id)">删除</a-button>
        </template>
      </template>
    </a-table>
  </div>
</template>
<script lang="ts" setup>
import { SmileOutlined } from '@ant-design/icons-vue'
import { deleteUserUsingPost, listUserVoByPageUsingPost } from '@/api/userController'
import { computed, onMounted, reactive, ref } from 'vue'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
import { useLoginUserStore } from '@/stores/useLoginUserStore'

const columns = [
  {
    title: 'id',
    dataIndex: 'id',
  },
  {
    title: '账号',
    dataIndex: 'userAccount',
  },
  {
    title: '用户名',
    dataIndex: 'userName',
  },
  {
    title: '头像',
    dataIndex: 'userAvatar',
  },
  {
    title: '简介',
    dataIndex: 'userProfile',
  },
  {
    title: '用户角色',
    dataIndex: 'userRole',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    key: 'action',
  },
]

const doDelete = async (id: string) => {
  if (!id) {
    return
  }
  const res = await deleteUserUsingPost({ id })
  if (res.data.code === 0) {
    message.info('删除成功！')
    // 刷新数据
    await fetchData()
  } else {
    message.error('删除失败，' + res.data.message)
  }
}

// 定义数据
const dataList = ref<API.UserVO[]>([])
const total = ref(0)

// 搜索条件
const searchParams = reactive<API.UserQueryRequest>({
  current: 1,
  pageSize: 5,
  userName: '',
  userAccount: '',
})
// 根据条件获取数据
const doSearch = () => {
  searchParams.current = 1
  fetchData()
}

//分页参数
const pagination = computed(() => {
  // 默认选项
  const defaultOptions = ['5', '10', '20', '50']
  // 当前pageSize如果不在默认选项中，就添加到选项中
  const currentSize = String(searchParams.pageSize ?? 5)
  // 如果默认选项包含当前size 则直接返回 如果不包含 使用扩展运算符 (...) 创建一个新数组，
  // 包含 defaultOptions 的所有元素，并追加 currentSize，然后把新的数组排序
  const pageSizeOptions = defaultOptions.includes(currentSize)
    ? defaultOptions
    : [...defaultOptions, currentSize].sort((a, b) => Number(a) - Number(b))
  return {
    current: searchParams.current ?? 1,
    pageSize: searchParams.pageSize ?? 5,
    total: total.value,
    showSizeChanger: true,
    showTotal: (total) => `共 ${total} 条`,
    pageSizeOptions,
  }
})

const loginUserStore = useLoginUserStore()
// 获取数据
const fetchData = async () => {
  const res = await listUserVoByPageUsingPost({
    ...searchParams,
  })
  console.log("res.data.data:" + res.data.data)
    // 如果请求成功，则将数据赋值给dataList
  if (res.data.data) {
    dataList.value = res.data.data.records ?? []
    total.value = res.data.data.total ?? 0
  }
}

// 页面加载时获取数据，只请求一次
onMounted(() => {
  fetchData()
})

//表格变化处理
const doTableChange = (page: any) => {
  searchParams.current = page.current
  searchParams.pageSize = page.pageSize
  fetchData()
}
</script>
<style scoped>
.table {
  width: 95%;
  margin-left: 3%;
}
</style>
