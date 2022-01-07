import {BookCategoryDTO, BookCategoryEdit} from '../../core/BookCategory'
import {
  createCategory as createCategoryR,
  getGroupCategories as getGroupCategoriesR,
  updateCategory as updateCategoryR,
  removeCategory as removeCategoryR,
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

export const removeCategory = async (bookCategoryId: number) => {
  try {
    const bookCategory = await removeCategoryR(bookCategoryId)
    return bookCategory
  } catch (err) {
    return false
  }
}

export const updateCategory = async (data: BookCategoryEdit) => {
  try {
    const bookCategory = await updateCategoryR(data)
    return bookCategory
  } catch (err) {
    return false
  }
}
