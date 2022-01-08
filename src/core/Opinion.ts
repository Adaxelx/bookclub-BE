import {Opinion as PrismaOpinion, User} from '@prisma/client'

export type OpinionDTO = Omit<PrismaOpinion, 'id'>

type UserReturn = Pick<User, 'name' | 'email'>

export type OpinionReturn = Omit<PrismaOpinion, 'userId'> & {
  user: UserReturn | null
}
