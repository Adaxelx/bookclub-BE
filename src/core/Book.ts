import {Book as PrismaBook} from '@prisma/client'

type WithOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export type BookDTO = WithOptional<Omit<PrismaBook, 'id'>, 'dateStart'>

export default PrismaBook
