import { findByPair } from '../db/conversations/findByPair'
import { create as createConversation } from '../db/conversations/create'
import { create as createMessage } from '../db/messages/create'
import { findForConversationId } from '../db/messages/findForConversationId'
import { getGreeting } from '../db/users/getGreeting'

export const conversation = async (_, { subjectId, interviewerId }) => {
  const dbConversation = await findByPair({ subjectId, interviewerId })

  if (!dbConversation) {
    const { id: conversationId } = await createConversation({
      subjectId,
      interviewerId
    })

    const greeting = await getGreeting(subjectId)

    const messageData = {
      senderId: subjectId,
      type: 'text',
      content: greeting
    }
    const dbMessage = await createMessage({ conversationId, data: messageData })

    return {
      id: conversationId,
      messages: [
        {
          ...dbMessage.data,
          id: dbMessage.id,
          sender: {
            id: subjectId
          }
        }
      ]
    }
  }

  const dbMessages = await findForConversationId(dbConversation.id)

  return {
    id: dbConversation.id,
    messages: dbMessages.map(({ data, ...restProps }) => ({
      ...restProps,
      ...data,
      sender: {
        id: data.senderId
      }
    }))
  }
}
