import prisma from '../../utils/prismaClient'
import {errorHandler} from '../../utils/helpers'

import {OpinionDTO, OpinionReturn} from '../../core/Opinion'

export const createOpinion = async ({bookId, userId, ...data}: OpinionDTO) => {
  try {
    // const hasUserRatedBook = await prisma.opinion.findFirst({
    //   where: {userId, bookId},
    // })

    // if (hasUserRatedBook) {
    //   return 'exist'
    // }

    const opinion = await prisma.opinion.create({
      data: {
        book: {connect: {id: bookId}},
        user: {connect: {id: userId}},
        ...data,
      },
    })

    return opinion
  } catch (err) {
    console.log(err)
    return errorHandler(err) || false
  }
}

export const getOpinionsForBook = async (bookId: number) => {
  try {
    const opinions = await prisma.opinion.findMany({
      where: {bookId},
    })
    const mappedOpinionsWithUsers: OpinionReturn[] = await Promise.all(
      opinions.map(async ({userId, ...opinion}) => {
        const userData = await prisma.user.findFirst({where: {id: userId}})
        const user = userData && {name: userData.name, email: userData.email}
        return {
          ...opinion,
          user,
        }
      }),
    )
    return mappedOpinionsWithUsers
  } catch (err) {
    return errorHandler(err) || false
  }
}
