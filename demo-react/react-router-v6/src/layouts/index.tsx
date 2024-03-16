import React from 'react'
import App from '/@/App'

export const Component: React.FC = () => {
  return (
    <>
      <header>
        <h2>layout header</h2>
      </header>

      <main>
        <App />
      </main>

      <footer>
        <h3>footer</h3>
      </footer>
    </>
  )
}
