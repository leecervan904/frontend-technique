import axios, { isCancel } from 'axios'

const instance = axios.create({
  // baseURL: import.meta.env.DEV ? '/api' : '/'
  baseURL: '/',
})

// Map: symbol key => cancel controller
const pendingMap = new Map()

instance.interceptors.request.use(
  (config) => {
    const { signalKey } = config

    if (signalKey) {
      const prevSignal = pendingMap.get(signalKey)
      if (prevSignal) {
        prevSignal.abort()
      }

      const cancel = new AbortController()
      pendingMap.set(signalKey, cancel)
      config.signal = cancel.signal
    }

    return config
  },
  (error) => {
    // console.log(error)
    return error
  },
)

instance.interceptors.response.use(
  (config) => {
    console.log(config)
    return config
  },
  (error) => {
    // console.log(isCancel(error), '===')
    // if (isCancel(error)) {
    //   return Promise.resolve(null)
    // }
    return error
  },
)

export function createRaceRequest() {
  let cancel = new AbortController()
  let pending = false

  return async (options) => {
    console.log(pending)

    if (pending) {
      // console.log('取消上一个请求...')
      cancel.abort()
      cancel = new AbortController()
    }

    pending = true
    try {
      const res = await instance({
        ...options,
        signal: cancel.signal
      })

      if (!isCancel(res)) {
        pending = false
        return res
      }

      return null
    } catch (error) {
      console.log(error)
      return Promise.reject(error)
    }
  }
}

export { instance as request }
