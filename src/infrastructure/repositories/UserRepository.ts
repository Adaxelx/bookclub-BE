import {User, UserCredentials, UserTokenCredentials} from 'core/User'
import {PrismaClient} from '@prisma/client'
import {errorHandler} from '../../utils/helpers'
import {sendRegisterEmail} from '../../utils/mailer'
const prisma = new PrismaClient()

export const loginUser = async ({email, password}: UserCredentials) => {
  try {
    const user = await prisma.user.findUnique({where: {email}})
    if (user && user.password === password) {
      return {id: user.id, email: user.email} as UserTokenCredentials
    }
    return false
  } catch (err) {
    return errorHandler(err) || false
  }
}

export const registerUser = async (userData: User) => {
  const {email} = userData
  try {
    const existingUser = await prisma.user.findUnique({where: {email}})
    if (existingUser) {
      return 'exist'
    }
    const user = await prisma.user.create({data: userData})
    if (user) {
      await sendRegisterEmail(user)
    }
    return user
  } catch (err) {
    return errorHandler(err) || false
  }
}
