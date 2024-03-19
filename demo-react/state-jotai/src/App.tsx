import { useAtom, useSetAtom } from 'jotai'
import { countAtom, asyncCountAtom, loadableCountAtom } from './store'

function LoadingCount() {
  const [count] = useAtom(loadableCountAtom)

  if (count.state === 'loading') {
    return <span>Loading...</span>
  }
  if (count.state === 'hasError') {
    return <span>Error...</span>
  }

  console.log(count.data)
  return <span>{count.data}</span>
}

function App() {
  const [count, setCount] = useAtom(countAtom)
  const setCountAsync = useSetAtom(asyncCountAtom)

  return (
    <>
      <span>{count}</span>
      <button onClick={() => setCount(pre => pre + 1)}>+</button>
      <button onClick={() => setCount(pre => pre - 1)}>-</button>
      <button onClick={() => setCountAsync(100)}>Async +</button>

      <div>
        <LoadingCount />
      </div>
    </>
  )
}

export default App
