import {User, UserCredentials, UserTokenCredentials} from 'core/User'
import {
  loginUser as loginUserR,
  registerUser as registerUserR,
} from '../repositories/UserRepository'
import {checkIfValidData} from '../../utils/helpers'
import jwt from 'jsonwebtoken'

function generateAccessToken(data: UserTokenCredentials) {
  const token = process.env.TOKEN_SECRET

  if (token) {
    return jwt.sign(data, token, {expiresIn: '7d'})
  }
}

export const loginUser = async (credentials: UserCredentials) => {
  try {
    const isLoggedIn = await loginUserR(credentials)
    const {email} = credentials
    if (checkIfValidData<UserTokenCredentials>(isLoggedIn)) {
      const token = generateAccessToken(isLoggedIn)
      if (token) {
        return token
      }
    }
  } catch (err) {
    throw err
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
        return {token, user: userResponse}
      }
    }
    return userResponse
  } catch (err) {
    throw err
  }
}
