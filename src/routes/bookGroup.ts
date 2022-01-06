import {Router} from 'express'
import {
  authenticateUser,
  checkIfUserIsAdmin,
  handleResponse,
} from '../utils/helpers'
import {
  createGroup,
  addToGroup,
  getUserBookGroups,
} from '../infrastructure/services/BookGroupService'
import {BookGroup} from '@prisma/client'
const router = Router()

router.use(authenticateUser)

router.post('/', async (req, res) => {
  const {name, userId} = req.body
  const body = {name, userId}
  try {
    const response = await createGroup(body)
    handleResponse<BookGroup>(res, response)
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

router.patch('/:id/addUser', checkIfUserIsAdmin, async (req, res, next) => {
  const {userId} = req.body
  const {id} = req.params

  const body = {id: parseInt(id), userId}

  try {
    const response = await addToGroup(body)

    handleResponse<BookGroup>(res, response)
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

router.get('/all/:userId', async (req, res) => {
  const {userId} = req.params

  try {
    const response = await getUserBookGroups(parseInt(userId))
    handleResponse<BookGroup[]>(res, response)
    return
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

export default router
