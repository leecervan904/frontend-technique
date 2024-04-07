import { App as VueApp, createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue';
import App from './App.vue';
import './style.css'
import '@arco-design/web-vue/dist/arco.css';

declare global {
  interface Window {
    // 是否存在无界
    __POWERED_BY_WUJIE__?: boolean;
    // 子应用mount函数
    __WUJIE_MOUNT: () => void;
    // 子应用unmount函数
    __WUJIE_UNMOUNT: () => void;
    // 子应用无界实例
    __WUJIE: { mount: () => void };
  }
}

let app: VueApp;
if (window.__POWERED_BY_WUJIE__) {
  window.__WUJIE_MOUNT = () => {
    app = createApp(App);
    // const router = createRouter({ history: createWebHistory(), routes });
    // app.use(router);
    app.use(ArcoVue);
    app.mount("#app");
  };
  window.__WUJIE_UNMOUNT = () => {
    app.unmount();
  };
} else {
  app = createApp(App)
  app.use(ArcoVue);
  // app.use(createRouter({ history: createWebHistory(), routes }))
  app.mount("#app");
}

// const app = createApp(App);
// app.use(ArcoVue);
// app.mount('#app');
