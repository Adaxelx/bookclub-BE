import {PrismaClient} from '@prisma/client'
import {mockDeep, mockReset, DeepMockProxy} from 'jest-mock-extended'

import prisma from './prismaClient'

jest.mock('./prismaClient', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}))

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>

beforeEach(() => {
  mockReset(prismaMock)
})
