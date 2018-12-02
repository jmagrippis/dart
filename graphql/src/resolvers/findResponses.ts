import { findBy } from '../db/responses/findBy'

export const findResponses = async (
  _,
  { userId, topicId, parentResponseId }
) => {
  const dbResponses = await findBy({ userId, topicId, parentResponseId })
  if (!dbResponses || !dbResponses.length) return []

  return dbResponses.map(({ data, ...restProps }) => ({
    ...restProps,
    ...data,
    topic: {
      id: restProps.topic_id
    }
  }))
}
