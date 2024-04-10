<script setup>
import { ref } from 'vue'
import { createRaceRequest } from './utils/request'

const title = ref('')
const send = createRaceRequest()

const handleClick1 = () => {
  send({
    path: '/',
    methods: 'GET',
    params: { ms: 3000 },
  }).then(() => {
    title.value = 3000
  })
}

const handleClick2 = () => {
  send({
    path: '/',
    methods: 'GET',
    params: { ms: 1000 },
  }).then(() => {
    title.value = 1000
  })
}
</script>

<template>
  <div>
    <button @click="handleClick1">Send 3000ms</button>
    <button @click="handleClick2">Send 1000ms</button>

    <h2>请求结果：{{ title }}</h2>
  </div>
</template>
