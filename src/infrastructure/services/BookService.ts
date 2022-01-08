import {BookDTO} from '../../core/Book'
import {
  createBook as createBookR,
  getBookForCategory as getBookForCategoryR,
} from '../repositories/BookRepository'

function returnDate<T extends Date | undefined>(date: T) {
  return date && new Date(date)
}

export const createBook = async (bookCategoryData: BookDTO) => {
  try {
    const dateStart = returnDate<Date | undefined>(bookCategoryData.dateStart)
    const dateEnd = returnDate<Date>(bookCategoryData.dateEnd)

    const book = await createBookR({...bookCategoryData, dateStart, dateEnd})
    return book
  } catch (err) {
    return false
  }
}

export const getBookForCategory = async (categoryId: number) => {
  try {
    const book = await getBookForCategoryR(categoryId)
    return book
  } catch (err) {
    return false
  }
}
