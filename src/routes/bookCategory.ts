import {Router} from 'express'
import {authenticateUser, handleResponse} from '../utils/helpers'
import {
  createCategory,
  getGroupCategories,
} from '../infrastructure/services/BookCategoryService'
import {BookCategory} from '@prisma/client'

const router = Router()

router.use(authenticateUser)

router.post('/', async (req, res) => {
  const {name, bookGroupId} = req.body
  const body = {name, bookGroupId}
  try {
    const response = await createCategory(body)
    handleResponse<BookCategory>(res, response)
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

router.get('/all/:bookGroupId', async (req, res) => {
  const {bookGroupId} = req.params

  try {
    const response = await getGroupCategories(parseInt(bookGroupId))
    handleResponse<BookCategory[]>(res, response)
    return
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

export default router
