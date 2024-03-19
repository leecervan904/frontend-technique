import React, { createContext } from 'react'
import { counterStore } from './module/counter'

const store = createContext({
  counterStore
})

const StoreProvider: React.FC<{
  children: React.ReactNode | React.ReactNode[]
}> = ({ children }) => {
  return (
    <store.Provider value={{ counterStore }}>
      {children}
    </store.Provider>
  )
}

export { StoreProvider, store }
