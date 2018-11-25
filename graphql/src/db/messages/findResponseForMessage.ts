import { MessageData, DbMessage } from '../types'
import { find } from '../conversations/find'
import { findForUserIdAndName } from '../intents/findForUserIdAndName'
import { identifyIntent } from '../../dialogFlow/identifyIntent'

export const findResponseForMessage = async ({
  conversation_id,
  data: { content }
}: DbMessage): Promise<MessageData> => {
  const conversation = await find(conversation_id)

  if (!conversation) {
    throw Error(`Could not find conversation ${conversation_id}`)
  }

  const { name, entities } = await identifyIntent({
    content,
    conversationId: conversation_id
  })

  const intent = await findForUserIdAndName({
    name,
    userId: conversation.subject_id
  })

  if (!intent) return

  if (!entities.length) {
    const response = {
      type: 'text',
      content: intent.data.response,
      senderId: conversation.subject_id
    }

    return response
  }

  if (
    entities &&
    intent.data.entities &&
    intent.data.entities[entities[0].name]
  ) {
    const response = {
      type: 'text',
      content: intent.data.entities[entities[0].name].response,
      senderId: conversation.subject_id
    }

    return response
  }
}
