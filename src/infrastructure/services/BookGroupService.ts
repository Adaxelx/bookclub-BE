import {BookGroupAddToGroupDTO, BookGroupDTO} from '../../core/BookGroup'
import {PrismaClient} from '@prisma/client'
import {
  createGroup as createGroupR,
  addToGroup as addToGroupR,
} from '../repositories/BookGroupRepository'
const prisma = new PrismaClient()

export const createGroup = async (bookGroupData: BookGroupDTO) => {
  try {
    const bookGroup = await createGroupR(bookGroupData)
    return bookGroup
  } catch (err) {
    return false
  }
}

export const addToGroup = async (bookGroupData: BookGroupAddToGroupDTO) => {
  try {
    const bookGroup = await addToGroupR(bookGroupData)
    return bookGroup
  } catch (err) {
    return false
  }
}
