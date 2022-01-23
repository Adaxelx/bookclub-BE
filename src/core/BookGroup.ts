import {BookGroup as PrismaBookGroup} from '../utils/prismaClient'

export type BookGroupDTO = {userId: number} & Omit<
  PrismaBookGroup,
  'id' | 'creatorId'
>
export type BookGroupAddToGroupDTO = {email: string} & Omit<
  PrismaBookGroup,
  'name' | 'creatorId'
>
