import {PrismaClient} from '@prisma/client'
const db = new PrismaClient()

async function seed() {
  await Promise.all(
    getUsers().map(user => {
      return db.user.create({
        data: {
          ...user,
          bookGroups: {
            create: [{bookGroup: {create: {name: 'test', creatorId: 1}}}],
          },
        },
      })
    }),
  )

  await Promise.all(
    getBookCategories().map(bookCategory => {
      return db.bookCategory.create({
        data: {...bookCategory, bookGroup: {connect: {id: 1}}},
      })
    }),
  )
  await Promise.all(
    getBook().map(data => {
      return db.book.create({data: {...data, category: {connect: {id: 1}}}})
    }),
  )
  await Promise.all(
    getOpinion().map(data => {
      return db.opinion.create({
        data: {...data, user: {connect: {id: 1}}, book: {connect: {id: 1}}},
      })
    }),
  )
}

seed()

function getUsers() {
  return [
    {
      name: 'Adrian',
      email: 'akmostowski@gmail.com',
      password: 'password',
    },
  ]
}

function getBookGroups() {
  return [
    {
      name: 'Konoha',
    },
  ]
}

function getBookCategories() {
  return [
    {
      name: 'Kryminał',
    },
  ]
}

function getBook() {
  return [
    {
      title: 'Zapisane w kościach',
      author: 'Simon Beckett',
      dateStart: new Date(),
      dateEnd: new Date(),
    },
  ]
}

function getOpinion() {
  return [
    {
      description: 'Super ksiąka',
      rate: 10,
    },
  ]
}
