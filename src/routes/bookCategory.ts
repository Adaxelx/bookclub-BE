import {Router} from 'express'
import {
  authenticateUser,
  checkIfUserIsAdmin,
  checkIfUserIsInGroup,
  handleResponse,
} from '../utils/helpers'
import {
  createCategory,
  getGroupCategories,
  removeCategory,
  updateCategory,
} from '../infrastructure/services/BookCategoryService'
import {BookCategory} from '@prisma/client'
import {BookCategoryEdit} from 'core/BookCategory'
import {bookGroupRoute} from '../utils/constants'

const router = Router()

const route = `${bookGroupRoute}bookCategory/`

router.use(authenticateUser)

router.post(route, checkIfUserIsAdmin, async (req, res) => {
  const {name} = req.body
  const bookGroupId = parseInt(req.params.bookGroupId)
  const body = {name, bookGroupId}
  try {
    const response = await createCategory(body)
    handleResponse<BookCategory>(res, response)
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

router.get(`${route}all`, checkIfUserIsInGroup, async (req, res) => {
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

router.delete(`${route}:id`, checkIfUserIsAdmin, async (req, res) => {
  const {id} = req.params

  try {
    const response = await removeCategory(parseInt(id))
    handleResponse<BookCategory>(res, response)
    return
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

router.patch(`${route}:id`, checkIfUserIsAdmin, async (req, res) => {
  const {id} = req.params
  const data: BookCategoryEdit = {id: parseInt(id), ...req.body}

  try {
    const response = await updateCategory(data)
    handleResponse<BookCategory>(res, response)
    return
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

export default router
