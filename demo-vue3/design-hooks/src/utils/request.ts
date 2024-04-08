import axios from 'axios'

const request = axios.create({
  baseURL: import.meta.env.MODE === 'development' ? '/api/' : 'http://localhost/api/',
  // timeout: 10000,
})

export { request }
