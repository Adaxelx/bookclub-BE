import {User} from 'core/User'
import {Router} from 'express'
import {authenticateUser, checkIfValidData} from '../utils/helpers'
import {createGroup} from '../infrastructure/services/BookGroupService'
import {BookGroup} from '@prisma/client'
const router = Router()

router.use(authenticateUser)

router.post('/', async (req, res) => {
  const {name, userId} = req.body
  const credentials = {name, userId}
  try {
    const response = await createGroup(credentials)
    if (checkIfValidData<BookGroup>(response)) {
      res.status(200)
      res.json(response)
    } else if (response) {
      res.status(400)
      res.json({status: response})
    }
    res.status(500)
    res.json({status: 'unhandled'})
  } catch (err) {
    res.status(500)
    res.json({status: 'unhandled'})
  }
})

export default router
