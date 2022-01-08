import prisma from '../../utils/prismaClient'
import {errorHandler} from '../../utils/helpers'
import {BookDTO} from '../../core/Book'

export const createBook = async ({categoryId, ...data}: BookDTO) => {
  try {
    const book = await prisma.book.create({
      data: {
        ...data,
        category: {connect: {id: categoryId}},
      },
    })

    return book
  } catch (err) {
    return errorHandler(err) || false
  }
}

export const getBookForCategory = async (categoryId: number) => {
  try {
    const book = await prisma.book.findFirst({
      where: {categoryId},
    })
    return book || 'notFound'
  } catch (err) {
    return errorHandler(err) || false
  }
}
