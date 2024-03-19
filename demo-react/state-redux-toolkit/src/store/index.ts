import { configureStore } from '@reduxjs/toolkit'

import { counterSlice } from './counter'
import { appSlice } from './app'

export * from './app'
export * from './counter'

const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    counter: counterSlice.reducer,
  }
})

export { store }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
