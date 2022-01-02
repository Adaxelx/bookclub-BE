import {User} from 'core/User'
import {Router} from 'express'
import {authenticateUser, checkIfValidData} from '../utils/helpers'
import {
  createGroup,
  addToGroup,
} from '../infrastructure/services/BookGroupService'
import {BookGroup} from '@prisma/client'
const router = Router()

router.use(authenticateUser)

router.post('/', async (req, res) => {
  const {name, userId} = req.body
  const body = {name, userId}
  try {
    const response = await createGroup(body)
    if (checkIfValidData<BookGroup>(response)) {
      res.status(200)
      res.json(response)
    } else if (response) {
      res.status(400)
      res.json({status: response})
    } else {
      res.status(500)
      res.json({status: 'unhandled'})
    }
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

router.patch('/:id/addUser', async (req, res) => {
  const {userId} = req.body
  const {id} = req.params
  const body = {id: parseInt(id), userId}
  try {
    const response = await addToGroup(body)
    res.status(200)
    res.json(response)
    // if (checkIfValidData<BookGroup>(response)) {
    //   res.status(200)
    //   res.json(response)
    // } else if (response) {
    //   res.status(400)
    //   res.json({status: response})
    // }
    // res.status(500)
    // res.json({status: 'unhandled'})
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

export default router
