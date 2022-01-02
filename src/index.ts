import express from 'express'
import {PrismaClient} from '@prisma/client'
import dotenv from 'dotenv'
import userRoutes from './routes/user'
dotenv.config()

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use('/user', userRoutes)
app.get('/', async (req, res) => {
  const allUsers = await prisma.bookGroup.findMany()
  const allUsers2 = await prisma.user.findMany()
  const allUsers3 = await prisma.book.findMany()
  const allUsers4 = await prisma.bookCategory.findMany()
  const allUsers5 = await prisma.opinion.findMany()
  res.json({allUsers, allUsers2, allUsers3, allUsers4, allUsers5})
})

app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:8000`)
})
