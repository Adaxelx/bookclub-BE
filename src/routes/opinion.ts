import {Router} from 'express'
import {
  authenticateUser,
  checkIfUserIsInGroup,
  checkIfUserIsUserPassed,
  handleResponse,
} from '../utils/helpers'
import {Opinion} from '@prisma/client'
import {
  createOpinion,
  getOpinionsForBook,
} from '../infrastructure/services/OpinionService'
import {OpinionReturn} from '../core/Opinion'
import {bookGroupRoute} from '../utils/constants'
const router = Router()

router.use(authenticateUser)

const route = `${bookGroupRoute}opinion/`

router.post(
  `${route}`,
  checkIfUserIsInGroup,
  checkIfUserIsUserPassed,
  async (req, res) => {
    const {bookId, description, userId, rate} = req.body
    const body = {bookId, description, userId, rate}
    try {
      const response = await createOpinion(body)
      handleResponse<Opinion>(res, response)
    } catch (err) {
      console.log(err)
      res.status(500)
      res.json({message: 'unhandled'})
    }
  },
)

router.get(`${route}:bookId`, async (req, res) => {
  const {bookId} = req.params

  try {
    const response = await getOpinionsForBook(parseInt(bookId))
    handleResponse<OpinionReturn[]>(res, response)
    return
  } catch (err) {
    res.status(500)
    res.json({message: 'unhandled'})
  }
})

export default router
