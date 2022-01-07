import {BookCategoryDTO} from '../../core/BookCategory'
import {
  createCategory as createCategoryR,
  getGroupCategories as getGroupCategoriesR,
} from '../repositories/BookCategoryRepository'

export const createCategory = async (bookCategoryData: BookCategoryDTO) => {
  try {
    const bookCategory = await createCategoryR(bookCategoryData)
    return bookCategory
  } catch (err) {
    return false
  }
}

export const getGroupCategories = async (bookGroupId: number) => {
  try {
    const bookCategories = await getGroupCategoriesR(bookGroupId)
    return bookCategories
  } catch (err) {
    return false
  }
}
