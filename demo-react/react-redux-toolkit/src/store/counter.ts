import { createSlice, Dispatch } from '@reduxjs/toolkit'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incremented: state => {
      state.value += 1
    },
    decremented: state => {
      state.value -= 1
    },
  },
})

export const { incremented, decremented } = counterSlice.actions

// 异步操作 需要分离定义
// 返回一个 thunk
export function incrementAsync() {
  return async (dispatch: Dispatch) => {
    await sleep(1000)
    dispatch(incremented())
  }
}
