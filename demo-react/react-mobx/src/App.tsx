import React, { useContext } from 'react'
import { observer } from 'mobx-react-lite'
import { store } from './store'

const CounterDemo: React.FC = observer(() => {
  const { counterStore } = useContext(store)

  return (
    <div>
      <span>{counterStore.count}</span>
      <button onClick={() => counterStore.increment()}>+</button>
      <button onClick={() => counterStore.decrement()}>-</button>
      <button onClick={() => counterStore.asyncIncrement()}>Async +</button>
    </div>
  )
})

CounterDemo.displayName = 'CounterDemo'

function App() {
  return (
    <>
      <CounterDemo />
    </>
  )
}

export default App
