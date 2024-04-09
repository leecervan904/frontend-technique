const allApps = [
  { name: '@react/router-v6', path: '/react-router-v6', port: 3101 },
  { name: '@react/component-design', path: '/react-component-design', port: 3102 },
  { name: '@react/state-redux-toolkit', path: '/react-state-redux-toolkit', port: 3103 },
  { name: '@react/state-mobx', path: '/react-state-mobx', port: 3104 },
  { name: '@react/state-zustand', path: '/react-state-zustand', port: 3105 },
  { name: '@react/state-jotai', path: '/react-state-jotai', port: 3106 },

  { name: '@vue3/design-hooks', path: '/vue3-design-hooks', port: 3201 },
]

export const apps = allApps
  .map(v => ({
    ...v,
    url: import.meta.env.DEV
      ? `http://${import.meta.env.VITE_APP_WUJIE_DOMAIN}:${v.port}`
      : `http://${import.meta.env.VITE_APP_WUJIE_DOMAIN}${v.path}/`
  }))

export const patchElementHook = (element, iframeWindow) => {
  if (element.nodeName === "STYLE") {
    element.insertAdjacentElement = function (_position, ele) {
      iframeWindow.document.head.appendChild(ele)
    }
  }
}
