// import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.tsx'
// import './index.css'
import { HashRouter } from 'react-router-dom'
import { Router } from './router'


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <HashRouter>
    <Router />
  </HashRouter>
    // <App />
  // </React.StrictMode>,
)
