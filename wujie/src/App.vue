<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

import { apps } from './apps'

const router = useRouter()

const active = ref('/')

const go = (path: string) => {
  active.value = path
  router.push(path)
}
</script>

<template>
  <div>
    <h2 class="p-3 w-full inline-flex gap-2 overflow-auto whitespace-nowrap shadow-lg">
      <div
        @click="go('/')"
        class="rounded px-2 py-1 transition-all"
        :class="[
          { 'bg-red-400': active === '/' },
        ]"
      >
        <span>Home</span>
      </div>
      <div
        v-for="app in apps" @click="go(app.path)"
        class="cursor-pointer rounded px-2 py-1 transition-all"
        :class="[
          { 'bg-red-400': active === app.path },
        ]"
      >
        <span>{{ app.name }}</span>
      </div>
    </h2>

    <router-view></router-view>
  </div>
</template>
