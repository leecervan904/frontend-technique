<script setup>
import { ref } from 'vue'
import { request } from './utils/request'

import axios from 'axios'

const title = ref('')

const signalKey = Symbol('')

const handleClick1 = () => {
  request({
    path: '/',
    methods: 'GET',
    params: { ms: 3000 },
    signalKey,
  }).then(() => {
    title.value = 3000
  })
}

const handleClick2 = () => {
  request({
    path: '/',
    methods: 'GET',
    params: { ms: 1000 },
    signalKey,
  }).then(() => {
    title.value = 1000
  })
}

function send() {
  axios.get('/api/dj/program?rid=336355127')
  .then(console.log)
  .catch(console.log)
}

</script>

<template>
  <div>
    <button @click="handleClick1">Send 3000ms</button>
    <button @click="handleClick2">Send 1000ms</button>

    <div>
      <button @click="send">send</button>
    </div>

    <h2>请求结果：{{ title }}</h2>
  </div>
</template>
