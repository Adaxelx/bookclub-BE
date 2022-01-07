import {BookCategory as PrismaBookCategory} from '@prisma/client'

export type BookCategoryDTO = Omit<
  PrismaBookCategory,
  'id' | 'isActive' | 'wasPicked'
>

export type BookCategoryRemove = Omit<
  PrismaBookCategory,
  'name' | 'isActive' | 'wasPicked'
>

export type BookCategoryEdit = Omit<Partial<PrismaBookCategory>, 'bookGroupId'>

export default PrismaBookCategory

export function isBookCategory<T = unknown>(
  data: T | PrismaBookCategory,
): data is PrismaBookCategory {
  return typeof (data as PrismaBookCategory).wasPicked === 'boolean'
}
