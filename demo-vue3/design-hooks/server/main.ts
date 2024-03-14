import express from 'express'
import { PrismaClient, Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import bodyParser from 'body-parser'

export type UserItem = Awaited<ReturnType<typeof prisma.user.findMany>>[number]
export type ProductItem = Awaited<ReturnType<typeof prisma.product.findMany>>[number]

const app = express()
const prisma = new PrismaClient()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())


app.get('/user/init', async (req, res) => {
  const total = +(req.query.total as string) || 1000

  await prisma.user.deleteMany()

  await prisma.user.createMany({
    data: new Array(total).fill(null).map(() => ({
      name: faker.person.fullName(),
      age: faker.number.int({ min: 1, max: 100 }),
      desc: faker.string.alpha(10),
      sex: faker.number.int({ min: 1, max: 2 }),
    })),
  })

  res.json({
    status: 'success',
  })
})

app.get('/user/page', async (req, res) => {
  const pageNum = +(req.query.pageNum as string) || 1
  const pageSize = +(req.query.pageSize as string) || 10
  const name = req.query.name as string
  const sex = +(req.query.sex as string)

  console.log('GET /user/page:', pageNum, pageSize, sex);

  const where: Prisma.UserWhereInput = {}

  if (sex) {
    where.sex = sex
  }

  if (name) {
    where.name = {
      contains: name,
    }
  }

  const users = await prisma.user.findMany({
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    where,
  })

  const total = await prisma.user.count({
    where,
  })

  res.json({
    status: 'success',
    data: {
      list: users,
      pageInfo: {
        pageNum,
        pageSize,
        total,
        totalPage: Math.ceil(total / pageSize),
      }
    }
  })
})

app.post('/user/delete', async (req, res) => {
  const ids = req.body.ids

  await prisma.user.deleteMany({
    where: {
      id: { in: ids },
    }
  })

  res.json({
    status: 'success',
    ids,
  })
})

app.get('/product/init', async (req, res) => {
  const total = +(req.query.total as string) || 1000

  await prisma.product.deleteMany()

  await prisma.product.createMany({
    data: new Array(total).fill(null).map(() => ({
      name: faker.person.fullName(),
      title: faker.string.alpha(10),
      status: faker.number.int({ min: 1, max: 2 }),
    })),
  })

  res.json({
    status: 'success',
  })
})

app.get('/product/page', async (req, res) => {
  const pageNum = +(req.query.pageNum as string) || 1
  const pageSize = +(req.query.pageSize as string) || 10
  const status = +(req.query.status as string)
  const name = req.query.name as string
  const title = req.query.title as string

  console.log('GET /product/page:', pageNum, pageSize, status);

  const where: Prisma.ProductWhereInput = {}

  if (status) {
    where.status = status
  }

  if (name) {
    where.name = {
      contains: name,
    }
  }

  if (title) {
    where.title = {
      contains: title,
    }
  }

  const products = await prisma.product.findMany({
    skip: (pageNum - 1) * pageSize,
    take: pageSize,
    where,
  })

  const total = await prisma.product.count({
    where,
  })

  res.json({
    status: 'success',
    data: {
      list: products,
      pageInfo: {
        pageNum,
        pageSize,
        total,
        totalPage: Math.ceil(total / pageSize),
      }
    }
  })
})

app.post('/product/delete', async (req, res) => {
  const ids = req.body.ids

  await prisma.product.deleteMany({
    where: {
      id: { in: ids },
    }
  })

  res.json({
    status: 'success',
    ids,
  })
})

app.get('*', (req, res) => {
  res.json({
    msg: 'hello!'
  })
})

app.listen(3020, () => {
  console.log('server start in http://localhost:3020')
})
