import { DbMessage } from '../types'
import { findResponseForMessage } from './findResponseForMessage'
import { create } from './create'

export const createResponseForMessage = async (
  message: DbMessage
): Promise<DbMessage> => {
  const data = await findResponseForMessage(message)
  if (!data) return

  const response = await create({
    data,
    conversationId: message.conversation_id
  })

  return response
}
