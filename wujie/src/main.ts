import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'
import { setupRouter } from './router'

import WujieVue from "wujie-vue3"

// import '@unocss/reset/normalize.css'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'

// const { bus, setupApp, preloadApp, destroyApp } = WujieVue;

function bootstrap() {
  const app = createApp(App)

  app.use(WujieVue)

  setupRouter(app)

  app.mount('#app')
}

bootstrap()
