import {Prisma} from '.prisma/client'
import jwt from 'jsonwebtoken'

export function checkIfValidData<T>(data: any): data is T {
  return typeof data === 'object' && !Array.isArray(data) && data
}

export function authenticateUser(
  req: {headers: {[x: string]: any}},
  res: {status: (arg0: number) => void; json: (arg0: {message: string}) => any},
  next: () => void,
) {
  const token = req.headers['authorization']?.split(' ')?.[1]
  if (token === null) next()

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
    return 'notFound'
  }
}
