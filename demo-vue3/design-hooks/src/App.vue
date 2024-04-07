<script setup lang="ts">
import { ref } from 'vue'
import UserTable from './views/business-hooks/UserTable.vue'
import ProductTable from './views/business-hooks/ProductTable.vue'

const visible = ref(false)

// console.log(window.$wujie)
</script>

<template>
  <div>
    <a-button @click="visible = true">Open Modal</a-button>
    <a-modal v-model:visible="visible" @ok="visible = !visible">
      <template #title>
        Title
      </template>
      <div>You can customize modal body text by the current situation. This modal will be closed immediately once you press the OK button.</div>
    </a-modal>

    <UserTable />

    <ProductTable />
  </div>
</template>
