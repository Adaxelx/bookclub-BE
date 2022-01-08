import {OpinionDTO} from '../../core/Opinion'
import {
  createOpinion as createOpinionR,
  getOpinionsForBook as getOpinionsForBookR,
} from '../repositories/OpinionRepository'

export const createOpinion = async (opinionData: OpinionDTO) => {
  try {
    const {rate} = opinionData
    if (rate < 0 || rate > 10) {
      return 'rate:notValid'
    }
    const opinion = await createOpinionR(opinionData)
    return opinion
  } catch (err) {
    return false
  }
}

export const getOpinionsForBook = async (bookId: number) => {
  try {
    const book = await getOpinionsForBookR(bookId)
    return book
  } catch (err) {
    return false
  }
}
