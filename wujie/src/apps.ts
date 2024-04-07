

export const apps = [
  // react
  {
    name: 'React router-v6',
    path: '/react-router-v6',
    url: 'http://127.0.0.1:3101',
  },
  {
    name: 'React component-design',
    path: '/react-component-design',
    url: 'http://127.0.0.1:3102',
  },
  {
    name: 'React state-redux-toolkit',
    path: '/react-state-redux-toolkit',
    url: 'http://127.0.0.1:3103',
  },
  {
    name: 'React state-mobx',
    path: '/react-state-mobx',
    url: 'http://127.0.0.1:3104',
  },
  {
    name: 'React state-zustand',
    path: '/react-state-zustand',
    url: 'http://127.0.0.1:3105',
  },
  {
    name: 'React state-jotai',
    path: '/react-state-jotai',
    url: 'http://127.0.0.1:3106',
  },

  // vue3
  {
    name: 'Vue3 design-hooks',
    path: '/vue3-design-hooks',
    url: 'http://127.0.0.1:3201',
  },

  // vue2
]

export const patchElementHook = (element, iframeWindow) => {
  if (element.nodeName === "STYLE") {
    element.insertAdjacentElement = function (_position, ele) {
      iframeWindow.document.head.appendChild(ele)
    }
  }
}
