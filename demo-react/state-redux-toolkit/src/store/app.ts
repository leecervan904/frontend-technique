import { createSlice, Dispatch, PayloadAction } from '@reduxjs/toolkit'

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export interface IAppSliceState {
  user: {
    name: string
    age: number
  }
}

const initialState: IAppSliceState = {
  user: {
    name: 'Tom',
    age: 18
  }
}

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<IAppSliceState['user']>) => {
      state.user = payload
    },
  },
})

export const { setUser } = appSlice.actions

export const setUserAsync = () => {
  return async (dispatch: Dispatch) => {
    await sleep(1000)
    dispatch(setUser({ name: 'Jerry', age: 20 }))
  }
}
