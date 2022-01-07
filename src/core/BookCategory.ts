import {BookCategory as PrismaBookCategory} from '@prisma/client'

export type BookCategoryDTO = Omit<
  PrismaBookCategory,
  'id' | 'isActive' | 'wasPicked'
>

export default PrismaBookCategory
