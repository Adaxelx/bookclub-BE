import {Router} from 'express'
import {authenticateUser, handleResponse} from '../utils/helpers'
import {Opinion} from '@prisma/client'
import {
  createOpinion,
  getOpinionsForBook,
} from '../infrastructure/services/OpinionService'
import {OpinionReturn} from '../core/Opinion'

const router = Router()

router.use(authenticateUser)

router.post('/', async (req, res) => {
  const {bookId, description, userId, rate} = req.body
  const body = {bookId, description, userId, rate}
  try {
    const response = await createOpinion(body)
    handleResponse<Opinion>(res, response)
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

router.get('/:bookId', async (req, res) => {
  const {bookId} = req.params

  try {
    const response = await getOpinionsForBook(parseInt(bookId))
    handleResponse<OpinionReturn[]>(res, response)
    return
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

export default router
