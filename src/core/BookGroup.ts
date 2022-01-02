import {BookGroup as PrismaBookGroup} from '.prisma/client'

export type BookGroupDTO = {userId: number} & Omit<PrismaBookGroup, 'id'>
