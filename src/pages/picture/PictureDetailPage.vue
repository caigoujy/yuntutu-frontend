<template>
  <!--  图片详情页面-->
  <div id="pictureDetailPage">
    <a-row :gutter="[16, 16]">
      <!-- 图片展示区 -->
      <a-col :sm="24" :md="12" :xl="16">
        <a-card title="图片预览">
          <a-image style="max-height: 600px; object-fit: contain" :src="picture.url" />
        </a-card>
      </a-col>
      <!-- 图片信息区 -->
      <a-col :sm="24" :md="12" :xl="8">
        <a-card title="图片信息">
          <a-descriptions :column="1">
            <a-descriptions-item label="作者">
              <a-space>
                <a-avatar :size="24" :src="picture.user?.userAvatar" />
                <div>{{ picture.user?.userName }}</div>
              </a-space>
            </a-descriptions-item>
            <a-descriptions-item label="名称">
              {{ picture.name ?? '未命名' }}
            </a-descriptions-item>
            <a-descriptions-item label="简介">
              {{ picture.introduction ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="分类">
              {{ picture.category ?? '默认' }}
            </a-descriptions-item>
            <a-descriptions-item label="标签">
              <a-tag v-for="tag in picture.tags" :key="tag">
                {{ tag }}
              </a-tag>
            </a-descriptions-item>
            <a-descriptions-item label="格式">
              {{ picture.picFormat ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽度">
              {{ picture.picWidth ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="高度">
              {{ picture.picHeight ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="宽高比">
              {{ picture.picScale ?? '-' }}
            </a-descriptions-item>
            <a-descriptions-item label="大小">
              {{ formatSize(picture.picSize) }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
        <a-space wrap style="margin-top: 16px">
          <a-button type="primary" @click="doDownload">
            免费下载
            <template #icon>
              <DownloadOutlined />
            </template>
          </a-button>
          <a-button :icon="h(ShareAltOutlined)" v-if="canEdit" type="default" @click="doEdit">
            编辑
          </a-button>
          <a-button :icon="h(DeleteOutlined)" v-if="canEdit" danger @click="doDelete">
            删除
          </a-button>
        </a-space>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
import {computed, h, onMounted, ref} from 'vue'
import { deletePictureUsingPost, getPictureVoByIdUsingGet } from '@/api/pictureController'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
import {downloadImage, formatSize} from '@/utils'
import { useLoginUserStore } from '@/stores/useLoginUserStore'
import {
  DeleteOutlined,
  ShareAltOutlined,
  DownloadOutlined,
} from '@ant-design/icons-vue'
interface Props {
  id: string | number
}

const props = defineProps<Props>()

const picture = ref<API.PictureVO>({})

const fetchDate = async () => {
  try {
    const res = await getPictureVoByIdUsingGet({ id: props.id })
    if (res.data.code === 0 && res.data.data) {
      picture.value = res.data.data
    } else {
      message.error('获取图片详情失败：' + res.data.message)
    }
  } catch (e: any) {
    message.error('获取图片详情失败：' + e.message)
  }
}
// 页面加载时获取数据，只请求一次
onMounted(() => {
  fetchDate()
})

const router = useRouter()
// 编辑
const doEdit = () => {
  router.push('/add_picture?id=' + picture.value.id)
}
// 删除
const doDelete = async () => {
  const id = picture.value.id
  if (!id) {
    return
  }
  const res = await deletePictureUsingPost({ id })
  if (res.data.code === 0) {
    message.success('删除成功')
    router.push('/')
  } else {
    message.error('删除失败')
  }
}

// 校验用户权限
const loginUserStore = useLoginUserStore()
const canEdit = computed(() => {
  const userLogin = loginUserStore.loginUser
  // 未登录不可编辑
  if (!userLogin || !userLogin.id) {
    return false
  }
  const user = picture.value.user || {}
  return userLogin.id === user.id || userLogin.userRole === 'admin'
})

// 处理下载
const doDownload = () => {
  downloadImage(picture.value.url)
}

</script>

<style scoped>
#pictureDetailPage {
  margin-bottom: 26px;
}
</style>
