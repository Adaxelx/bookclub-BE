import {BookGroup as PrismaBookGroup} from '@prisma/client'

export type BookGroupDTO = {userId: number} & Omit<PrismaBookGroup, 'id'>
export type BookGroupAddToGroupDTO = {userId: number} & Omit<
  PrismaBookGroup,
  'name'
>
