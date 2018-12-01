import { findByUserId } from '../db/topics/findByUserId'

export const findTopicsByUserId = async (_, { userId }) => {
  const dbTopics = await findByUserId(userId)
  if (!dbTopics || !dbTopics.length) return []

  return dbTopics
}
