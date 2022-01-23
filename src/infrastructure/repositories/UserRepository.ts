import {User, UserCredentials, UserTokenCredentials} from 'core/User'
import prisma from '../../utils/prismaClient'
import {errorHandler} from '../../utils/helpers'
import {sendRegisterEmail} from '../../utils/mailer'

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

export const getUsersForBookGroup = async ({
  bookGroupId,
}: {
  bookGroupId: number
}) => {
  try {
    const users = await prisma.user.findMany({
      where: {bookGroups: {some: {bookGroupId}}},
    })
    return users
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

    return user
  } catch (err) {
    return errorHandler(err) || false
  }
}
