import {BookGroupDTO} from '../../core/BookGroup'
import {PrismaClient} from '@prisma/client'
import {createGroup as createGroupR} from '../repositories/BookGroupRepository'
const prisma = new PrismaClient()

export const createGroup = async (bookGroupData: BookGroupDTO) => {
  try {
    const bookGroup = await createGroupR(bookGroupData)
    return bookGroup
  } catch (err) {
    return false
  }
}
