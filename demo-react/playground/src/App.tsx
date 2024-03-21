import { useState } from 'react'



function Content() {
  function getInitialState() {
    console.log('initial state')
    let sum = 0;
    for (let i = 1; i <= 100; i++) {
      sum += 1;
    }
    return sum
  }
  
  const [count, setCount] = useState(getInitialState)

  return (
    <>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>+</button>
    </>
  )
}

function App() {
  return <Content />
}

export default App
