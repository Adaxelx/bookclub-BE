import {BookGroupDTO} from '../../core/BookGroup'
import {PrismaClient} from '@prisma/client'

const prisma = new PrismaClient()

export const createGroup = async ({userId, name}: BookGroupDTO) => {
  try {
    const doBookGroupExist = await prisma.bookGroup.findFirst({
      where: {users: {some: {id: {equals: 1}}}, name},
    })
    if (doBookGroupExist) {
      return 'exist'
    }
    const bookGroup = await prisma.bookGroup.create({
      data: {name, users: {connect: {id: userId}}},
    })
    return bookGroup
  } catch (err) {
    return false
  }
}
