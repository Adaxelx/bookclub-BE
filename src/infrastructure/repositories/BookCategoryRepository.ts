import {BookCategoryDTO} from '../../core/BookCategory'
import prisma from '../../utils/prismaClient'
import {errorHandler} from '../../utils/helpers'

export const createCategory = async ({bookGroupId, name}: BookCategoryDTO) => {
  try {
    const doBookCategoryExist = await prisma.bookCategory.findFirst({
      where: {bookGroup: {id: bookGroupId}, name},
    })
    if (doBookCategoryExist) {
      return 'exist'
    }
    const bookCategory = await prisma.bookCategory.create({
      data: {
        name,
        bookGroup: {connect: {id: bookGroupId}},
      },
    })
    return bookCategory
  } catch (err) {
    return errorHandler(err) || false
  }
}

export const getGroupCategories = async (bookGroupId: number) => {
  try {
    const groupCategories = await prisma.bookCategory.findMany({
      where: {bookGroup: {id: bookGroupId}},
    })
    return groupCategories
  } catch (err) {
    return errorHandler(err) || false
  }
}
