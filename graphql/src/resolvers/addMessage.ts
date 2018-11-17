import { create } from '../db/messages/create'

export const addMessage = async (
  _,
  { conversationId, content, interviewerId }
) => {
  const data = {
    content,
    senderId: interviewerId,
    type: 'text'
  }
  const { id } = await create({ conversationId, data })

  return {
    id,
    ...data,
    sender: {
      id: interviewerId
    }
  }
}
