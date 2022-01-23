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
import {bookGroupRoute} from '../utils/constants'
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
    res.json({message: 'unhandled'})
  }
})

router.patch(
  `${bookGroupRoute}addUser`,
  checkIfUserIsAdmin,
  async (req, res) => {
    const {email} = req.body
    const {bookGroupId} = req.params

    const body = {id: parseInt(bookGroupId), email}

    try {
      const response = await addToGroup(body)

      handleResponse<BookGroup>(res, response)
    } catch (err) {
      res.status(500)
      res.json({message: 'unhandled'})
    }
  },
)

router.get(`/all/:userId`, async (req, res) => {
  const {userId} = req.params

  try {
    const response = await getUserBookGroups(parseInt(userId))
    handleResponse<BookGroup[]>(res, response)
    return
  } catch (err) {
    console.log(err)
    res.status(500)
    res.json({message: 'unhandled'})
  }
})

export default router
