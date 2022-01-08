import {Router} from 'express'
import {
  authenticateUser,
  checkIfUserIsAdmin,
  checkIfUserIsInGroup,
  handleResponse,
} from '../utils/helpers'
import {Book} from '@prisma/client'
import {
  createBook,
  getBookForCategory,
} from '../infrastructure/services/BookService'
import {bookGroupRoute} from '../utils/constants'

const router = Router()

router.use(authenticateUser)

const route = `${bookGroupRoute}book/`

router.post(route, checkIfUserIsAdmin, async (req, res) => {
  const {categoryId, title, author, dateEnd, dateStart} = req.body
  const body = {categoryId, title, author, dateEnd, dateStart}
  try {
    const response = await createBook(body)
    handleResponse<Book>(res, response)
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

router.get(`${route}:categoryId`, checkIfUserIsInGroup, async (req, res) => {
  const {categoryId} = req.params

  try {
    const response = await getBookForCategory(parseInt(categoryId))
    handleResponse<Book>(res, response)
    return
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

export default router
