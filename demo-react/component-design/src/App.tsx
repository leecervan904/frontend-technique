import { Outlet, Link } from 'react-router-dom'

function App() {
  return (
    <>
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link to="/hoc">HOC</Link>
        <Link to="/composite">Composite</Link>
        <Link to="/render-props">RenderProps</Link>
        <Link to="/context">Context</Link>
      </div>

      <Outlet />
    </>
  )
}

export default App
