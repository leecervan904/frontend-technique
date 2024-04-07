<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import type { IRouteMeta } from '../router'
import { patchElementHook } from '../apps.ts'

const route = useRoute()

const meta = computed(() => route.meta as unknown as IRouteMeta)
</script>

<template>
  <div>
    <h1>{{ meta.path }}</h1>
    <WujieVue
      width="100%"
      height="300px"
      :name="meta.path"
      :url="meta.url"
      :sync="true"
      :props="{
        cnt: 100
      }"
      :plugins="[{ patchElementHook }]"
    />

    <!-- :fetch="fetch" -->
    <!-- :props="props"
    :beforeLoad="beforeLoad"
    :beforeMount="beforeMount"
    :afterMount="afterMount"
    :beforeUnmount="beforeUnmount"
    :afterUnmount="afterUnmount" -->
  </div>
</template>
