import { create } from '../db/messages/create'
import { createResponseForMessage } from '../db/messages/createResponseForMessage'

export const addMessage = async (
  _,
  { conversationId, content, interviewerId }
) => {
  const data = {
    content,
    senderId: interviewerId,
    type: 'text'
  }
  const message = await create({ conversationId, data })

  createResponseForMessage(message)

  return {
    id: message.id,
    ...data,
    sender: {
      id: interviewerId
    }
  }
}
