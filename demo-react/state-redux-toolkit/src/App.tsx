import { useSelector, useDispatch } from 'react-redux'
import type { RootState, AppDispatch } from './store'
import { setUserAsync } from './store/app'
import { incremented, decremented, incrementAsync } from './store/counter'

function App() {
  const count = useSelector((state: RootState) => state.counter.value)
  const user = useSelector((state: RootState) => state.app.user)
  const dispatch = useDispatch<AppDispatch>()

  console.log('render...')

  return (
    <>
      <h1>Vite + React</h1>

      <pre>{ JSON.stringify(user) }</pre>
      <button onClick={() => dispatch(setUserAsync())}>set user</button>

      <div className="card">
        <span>Count: {count}</span>
        <button onClick={() => dispatch(incremented())}>+</button>
        <button onClick={() => dispatch(decremented())}>-</button>
        <button onClick={() => dispatch(incrementAsync())}>async +</button>
      </div>
    </>
  )
}

export default App
