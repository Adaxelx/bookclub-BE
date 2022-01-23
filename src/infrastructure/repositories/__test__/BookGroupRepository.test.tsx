import {
  createGroup,
  getUserBookGroups,
  addToGroup,
} from '../BookGroupRepository'
import {prismaMock} from '../../../utils/setupTest'

describe('BookGroupRepository', () => {
  const error = new Error('Unhandled')
  describe('createGroup', () => {
    it('should create new book group ', async () => {
      const name = 'NewBookGroup'
      const userId = 1
      const bookGroup = {
        id: 2,
        creatorId: userId,
        name,
      }

      const bookGroupDTO = {userId, name}

      prismaMock.bookGroup.create.mockResolvedValue(bookGroup)

      await expect(createGroup(bookGroupDTO)).resolves.toEqual(bookGroup)
    })

    it('should not create new book group if for given user group with the same name exist', async () => {
      const name = 'NewBookGroup'
      const userId = 1
      const bookGroup = {
        id: 2,
        creatorId: userId,
        name,
      }

      const bookGroupDTO = {userId, name}

      prismaMock.bookGroup.findFirst.mockResolvedValue(bookGroup)

      prismaMock.bookGroup.create.mockResolvedValue(bookGroup)

      await expect(createGroup(bookGroupDTO)).resolves.toEqual(
        'Posiadasz grupę o podanej nazwie.',
      )
    })

    it('should handle other errors', async () => {
      const name = 'NewBookGroup234'
      const userId = 1

      const bookGroupDTO = {userId, name}

      prismaMock.bookGroup.create.mockRejectedValue(error)

      await expect(createGroup(bookGroupDTO)).resolves.toEqual(false)
    })
  })

  describe('Add to group', () => {
    it('should add to group', async () => {
      const id = 1
      const userId = 2

      const bookGroupDTO = {userId, id, email: 'abc@o2.pl'}

      const expectedGroup = {
        id,
        name: 'Something',
        creatorId: 1,
        email: 'abc@o2.pl',
      }

      prismaMock.user.findFirst.mockResolvedValue({
        name: 'aaa',
        email: 'bbb@gmail.com',
        password: 'ccc',
        id: 123,
      })

      prismaMock.bookGroup.update.mockResolvedValue(expectedGroup)

      await expect(addToGroup(bookGroupDTO)).resolves.toEqual(expectedGroup)
    })

    it('should handle unexpected error', async () => {
      const id = 1
      const userId = 2

      const bookGroupDTO = {userId, id, email: 'abc@o2.pl'}

      prismaMock.user.findFirst.mockResolvedValue({
        name: 'aaa',
        email: 'bbb@gmail.com',
        password: 'ccc',
        id: 123,
      })

      prismaMock.bookGroup.update.mockRejectedValue(error)

      await expect(addToGroup(bookGroupDTO)).resolves.toEqual(false)
    })
  })

  describe('Get user groups', () => {
    it('should get user groups', async () => {
      const id = 1
      const userId = 1

      const expectedGroups = [
        {
          id,
          name: 'Something',
          creatorId: 1,
        },
      ]

      prismaMock.bookGroup.findMany.mockResolvedValue(expectedGroups)

      await expect(getUserBookGroups(userId)).resolves.toEqual(expectedGroups)
    })

    it('should handle unexpected error', async () => {
      const userId = 2

      prismaMock.bookGroup.findMany.mockRejectedValue(error)

      await expect(getUserBookGroups(userId)).resolves.toEqual(false)
    })
  })
})
