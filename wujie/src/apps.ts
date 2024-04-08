export const apps = [
  // react
  {
    name: 'React router-v6',
    path: '/react-router-v6',
    url: import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3101' : 'http://localhost:8080/react-router-v6/',
  },
  {
    name: 'React component-design',
    path: '/react-component-design',
    url: import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3102' : '//localhost:8080/react-component-design/',
  },
  {
    name: 'React state-redux-toolkit',
    path: '/react-state-redux-toolkit',
    url: import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3103' : '//localhost:8080/react-state-redux-toolkit/',
  },
  {
    name: 'React state-mobx',
    path: '/react-state-mobx',
    url: import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3104' : '//localhost:8080/react-state-mobx/',
  },
  {
    name: 'React state-zustand',
    path: '/react-state-zustand',
    url: import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3105' : '//localhost:8080/react-state-zustand/',
  },
  {
    name: 'React state-jotai',
    path: '/react-state-jotai',
    url: import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3106' : '//localhost:8080/react-state-jotai/',
  },

  // vue3
  {
    name: 'Vue3 design-hooks',
    path: '/vue3-design-hooks',
    // url: import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3201' : '//localhost:8080/vue3-design-hooks/',
    url: import.meta.env.MODE === 'development' ? 'http://127.0.0.1:3201' : '//localhost:8081/',
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
