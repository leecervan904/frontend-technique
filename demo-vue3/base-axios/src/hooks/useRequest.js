import { ref } from 'vue'
import { request } from '../utils/request'

export function useRequest(
  options,
  {
    autoCancel = true
  } = {}
) {
  const opts = { ...options }
  let cancel = new AbortController()

  const pending = ref(false)

  if (autoCancel) {
    opts.signal = cancel.signal
  }

  return {
    pending,
    send: async () => {
      try {
        if (autoCancel && pending.value) {
          cancel.abort()
          cancel = new AbortController()
        }

        pending.value = true
        const res = await request(opts)
        pending.value = false
        return res
      } catch (error) {
        pending.value = false
        return Promise.reject(error)
      }
    },
  }
}

