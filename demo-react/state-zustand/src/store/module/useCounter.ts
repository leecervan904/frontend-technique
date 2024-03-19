import { create } from 'zustand'

interface CounterStoreState {
  count: number
}

interface CounterStoreAction {
  increment: () => void
  decrement: () => void
  asyncIncrement: () => Promise<void>
}

const sleep = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms))

export const useCounterStore = create<CounterStoreState & CounterStoreAction>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  decrement: () => set((state) => ({ count: state.count - 1 })),
  async asyncIncrement() {
    await sleep()
    set((state) => ({ count: state.count + 1 }))
  }
}))
