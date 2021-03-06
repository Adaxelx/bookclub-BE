import express from 'express'
import {PrismaClient} from '@prisma/client'
import dotenv from 'dotenv'
import userRoutes from './routes/user'
import bookGroupRoutes from './routes/bookGroup'
import bookCategoryRoutes from './routes/bookCategory'
import bookRoutes from './routes/book'
import opinionRoutes from './routes/opinion'
import cors from 'cors'

dotenv.config()

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())
app.use('/user', userRoutes)
app.use('/bookGroup', bookGroupRoutes)
app.use('/bookGroup', bookCategoryRoutes)
app.use('/bookGroup', bookRoutes)
app.use('/bookGroup', opinionRoutes)
app.get('/', async (req, res) => {
  const allUsers = await prisma.bookGroup.findMany()
  const allUsers2 = await prisma.user.findMany()
  const allUsers3 = await prisma.book.findMany()
  const allUsers4 = await prisma.bookCategory.findMany()
  const allUsers5 = await prisma.opinion.findMany()
  const allUsers6 = await prisma.bookGroupsToUsers.findMany()
  res.json({allUsers, allUsers2, allUsers3, allUsers4, allUsers5, allUsers6})
})

app.listen(8000, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:8000`)
})
