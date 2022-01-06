import {BookGroup as PrismaBookGroup} from '@prisma/client'

export type BookGroupDTO = {userId: number} & Omit<
  PrismaBookGroup,
  'id' | 'creatorId'
>
export type BookGroupAddToGroupDTO = {userId: number} & Omit<
  PrismaBookGroup,
  'name' | 'creatorId'
>
