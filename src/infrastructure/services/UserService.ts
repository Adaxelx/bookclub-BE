import {User, UserCredentials, UserTokenCredentials} from 'core/User'
import {
  loginUser as loginUserR,
  registerUser as registerUserR,
  getUsersForBookGroup as getUsersForBookGroupR,
} from '../repositories/UserRepository'
import {checkIfValidData} from '../../utils/helpers'
import jwt from 'jsonwebtoken'
import {sendRegisterEmail} from '../../utils/mailer'

function generateAccessToken(data: UserTokenCredentials) {
  const token = process.env.TOKEN_SECRET

  if (token) {
    return jwt.sign(data, token, {expiresIn: '7d'})
  }
}

export const loginUser = async (credentials: UserCredentials) => {
  try {
    const isLoggedIn = await loginUserR(credentials)
    if (checkIfValidData<UserTokenCredentials>(isLoggedIn)) {
      const token = generateAccessToken(isLoggedIn)
      if (token) {
        return {token, id: isLoggedIn.id}
      }
    }
  } catch (err) {
    return false
  }
}

export const registerUser = async (user: User) => {
  try {
    const userResponse = await registerUserR(user)

    if (checkIfValidData<User>(userResponse)) {
      const token = generateAccessToken({
        email: userResponse.email,
        id: userResponse.id,
      }) // TODO: add here id and simplify helper function
      if (token) {
        if (userResponse) {
          await sendRegisterEmail(userResponse)
        }
        return {token, user: userResponse}
      }
    }
    return userResponse
  } catch (err) {
    return false
  }
}

export const getUsersForBookGroup = async (data: {bookGroupId: number}) => {
  try {
    const users = await getUsersForBookGroupR(data)
    return users
  } catch (err) {
    return false
  }
}
