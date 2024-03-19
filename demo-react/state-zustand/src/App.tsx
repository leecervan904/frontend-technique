import { useCounterStore } from './store'

function App() {
  const { count, increment, decrement, asyncIncrement } = useCounterStore()

  return (
    <>
      <span>{count}</span>
      <button onClick={() => increment()}>+</button>
      <button onClick={() => decrement()}>-</button>
      <button onClick={() => asyncIncrement()}>Async +</button>
    </>
  )
}

export default App
