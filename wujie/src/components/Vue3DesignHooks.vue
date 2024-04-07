<script setup>
const patchElementHook = (element, iframeWindow) => {
  if (element.nodeName === "STYLE") {
    element.insertAdjacentElement = function (_position, ele) {
      iframeWindow.document.head.appendChild(ele)
    }
  }
}
</script>

<template>
  <div>
    <h1>Vue3 design-hooks</h1>
    <WujieVue
      width="100%"
      height="300px"
      name="vue3 design hooks"
      url="http://127.0.0.1:3201"
      :props="{
        cnt: 100
      }"
      :plugins="[{ patchElementHook}]"
    />
  </div>
</template>
