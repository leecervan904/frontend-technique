<script setup>
import { ref } from 'vue'
import { request } from './utils/request'
import { isCancel } from 'axios'

const title = ref('')
const loadingText = ref('')
let pending = false
let controller = new AbortController()

const getData = async (ms, tag) => {
  if (pending) {
    console.log('取消上一个请求')
    controller.abort()
    controller = new AbortController()
  }

  loadingText.value = `请求 ${tag} 开始...`
  pending = true
  try {
    const res = await request({
      path: '/',
      method: 'GET',
      params: { ms },
      signal: controller.signal,
    })

    if (!isCancel(res)) {
      title.value = res.data.msg + ' ' + ms
    }
  } catch (error) {
    console.log(error)
  }
  loadingText.value = `请求 ${tag} 结束...`
  pending = false
}

const handleClick1 = () => {
  getData(3000, 1)
}

const handleClick2 = () => {
  getData(1000, 2)
}
</script>

<template>
  <div>
    <button @click="handleClick1">Send 3000ms</button>
    <button @click="handleClick2">Send 1000ms</button>

    <h3>请求状态：{{ loadingText }}</h3>

    <h2>请求结果：{{ title }}</h2>
  </div>
</template>
