import prisma from './prismaClient'
import {Prisma} from '@prisma/client'
import jwt from 'jsonwebtoken'
import {Request, Response} from 'express'

type ReqType = Request
type ResType = Response
type NextType = () => void

export function checkIfValidData<T>(data: any): data is T {
  return typeof data === 'object' && data
}

export const getToken = (req: ReqType) =>
  req?.headers['authorization']?.split(' ')?.[1]

export function authenticateUser(req: ReqType, res: ResType, next: NextType) {
  const token = getToken(req)
  if (!token) {
    next()
    return
  }

  const localToken = process.env.TOKEN_SECRET || ''

  jwt.verify(token, localToken, (err: any, user: any) => {
    if (err) {
      res.status(403)
      return res.json({message: 'Not authorized.'})
    }

    next()
  })
}

export const errorHandler = (err: unknown) => {
  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2025':
        return 'notFound'
      case 'P2002':
        return 'duplicate'
      default:
        return err.code
    }
  }
}

export function handleResponse<T>(
  res: {status: (arg0: number) => void; json: (arg0: any) => void},
  response: string | false | T,
) {
  if (checkIfValidData<T>(response)) {
    res.status(200)
    res.json(response)
  } else if (response) {
    res.status(400)
    res.json({status: response})
  } else {
    res.status(500)
    res.json({status: 'unhandled'})
  }
}

export const checkIfUserIsAdmin = (
  req: ReqType,
  res: ResType,
  next: NextType,
) => {
  const token = getToken(req)
  const localToken = process.env.TOKEN_SECRET || ''
  const groupId = parseInt(req.params.id)

  let isUserAdmin = false
  if (token) {
    jwt.verify(token, localToken, async (err: any, user: any) => {
      try {
        if (user) {
          const bookGroup = await prisma.bookGroup.findFirst({
            where: {id: groupId, creatorId: user?.id},
          })
          isUserAdmin = Boolean(bookGroup)

          if (!isUserAdmin) {
            res.status(403)
            return res.json({message: 'notAuthorized.'})
          }
          next()
        }
      } catch (err) {
        res.status(500)
        return res.json({message: 'unknown'})
      }
    })
  }
}
