import {createGroup} from '../BookGroupRepository'
import {prismaMock} from '../../../utils/setupTest'

describe('BookGroupRepository', () => {
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
})
