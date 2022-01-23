import {User} from 'core/User'
import {Router} from 'express'
import {checkIfUserIsInGroup, checkIfValidData} from '../utils/helpers'
import {
  getUsersForBookGroup,
  loginUser,
  registerUser,
} from '../infrastructure/services/UserService'
const router = Router()

router.post('/login', async (req, res) => {
  const {email, password} = req.body
  const credentials = {email, password}

  try {
    const data = await loginUser(credentials)
    if (data) {
      res.status(200)
      res.json({...data})
    } else {
      res.status(404)
      res.json({message: 'Niepoprawne dane uzytkownika. Spróbuj ponownie.'})
    }
  } catch (err) {
    res.status(404)
    res.json({message: 'Niepoprawne dane uzytkownika. Spróbuj ponownie.'})
  }
})

router.get('/all/:bookGroupId', checkIfUserIsInGroup, async (req, res) => {
  const {bookGroupId} = req.params

  try {
    const data = await getUsersForBookGroup({
      bookGroupId: parseInt(bookGroupId),
    })
    if (data) {
      res.status(200)
      res.json(data)
    } else {
      res.status(400)
      res.json({message: 'Nie udało się pobrac uzytkownikow'})
    }
  } catch (err) {
    res.status(400)
    res.json({message: 'Nie udało się pobrac uzytkownikow'})
  }
})

router.post('/register', async (req, res) => {
  const {email, password, name} = req.body
  const user = {email, password, name}
  try {
    const response = await registerUser(user)
    if (checkIfValidData<{token: string; user: User}>(response)) {
      res.status(200)
      res.json({token: response?.token, id: response.user.id})
    } else if (response) {
      res.status(400)
      res.json({message: 'User exist in database.'})
    }
  } catch (err) {
    res.status(404)
    res.json({message: "Can't create user."})
  }
})

export default router
