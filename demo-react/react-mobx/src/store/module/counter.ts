import { makeAutoObservable, action, runInAction } from 'mobx'

const sleep = (ms: number = 1000) => new Promise(resolve => setTimeout(resolve, ms))

export class Counter {
  count = 0
  constructor() {
    makeAutoObservable(this)
  }
  increment() {
    this.count++
  }
  decrement() {
    this.count--
  }
  get double() {
    return this.count * 2
  }
  async asyncIncrement() {
    await sleep(1000)
    runInAction(() => {
      console.log('update...')
      this.count = 100
    })
  }
}

export const counterStore = new Counter()
