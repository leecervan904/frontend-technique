<script setup lang="ts">
import { apps } from '../apps'

console.log(apps)
</script>

<template>
  <div>
    <h2>home</h2>

    <div>
      <router-link to="/">Home</router-link>
      <router-link v-for="app in apps" :to="app.path">
        <span>{{ app.name }}</span>
      </router-link>
    </div>

    <router-view></router-view>
  </div>
</template>
