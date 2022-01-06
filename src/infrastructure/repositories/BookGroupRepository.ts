import {BookGroupAddToGroupDTO, BookGroupDTO} from '../../core/BookGroup'
import prisma from '../../utils/prismaClient'
import {errorHandler} from '../../utils/helpers'

export const createGroup = async ({userId, name}: BookGroupDTO) => {
  try {
    const doBookGroupExist = await prisma.bookGroup.findFirst({
      where: {users: {some: {userId}}, name},
    })
    if (doBookGroupExist) {
      return 'exist'
    }
    const bookGroup = await prisma.bookGroup.create({
      data: {
        name,
        creatorId: userId,
        users: {create: [{user: {connect: {id: userId}}}]},
      },
    })
    return bookGroup
  } catch (err) {
    return errorHandler(err) || false
  }
}

export const addToGroup = async ({userId, id}: BookGroupAddToGroupDTO) => {
  try {
    const updatedGroup = await prisma.bookGroup.update({
      where: {id},
      data: {users: {create: [{userId}]}},
    })
    return updatedGroup
  } catch (err) {
    return errorHandler(err) || false
  }
}

export const getUserBookGroups = async (userId: number) => {
  try {
    const userGroups = await prisma.bookGroup.findMany({
      where: {users: {some: {userId}}},
    })
    return userGroups
  } catch (err) {
    return errorHandler(err) || false
  }
}
