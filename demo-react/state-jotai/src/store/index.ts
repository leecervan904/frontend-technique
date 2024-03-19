import { atom } from 'jotai'
import { loadable } from 'jotai/utils'

export const countAtom = atom(0)
export const asyncCountAtom = atom(
  async get => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return get(countAtom)
  },
  async (get, set, payload: number) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    set(countAtom, payload)
  }
)
export const loadableCountAtom = loadable(asyncCountAtom)
