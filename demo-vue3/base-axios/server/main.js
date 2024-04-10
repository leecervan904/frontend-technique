import express from 'express'

const app = express()

app.get('/', (req, res) => {
  console.log(req.query)
  const ms = +req.query.ms || 0

  setTimeout(() => {
    res.json({
      msg: 'hello world',
    })
  }, ms)
})

app.listen(3002, () => {
  console.log('Server is running on http://localhost:3002/')
})

