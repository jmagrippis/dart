import { MessageData } from '../types'
import { find } from '../conversations/find'
import { findAllForUserId } from '../classes/findAllForUserId'

export const findResponseForMessage = async ({
  conversation_id,
  data: { content }
}): Promise<MessageData> => {
  const conversation = await find(conversation_id)

  if (!conversation) {
    throw Error(`Could not find conversation ${conversation_id}`)
  }

  const classes = await findAllForUserId(conversation.subject_id)

  const matchedClass = classes.find((c) => content.indexOf(c.name) > -1)

  if (!matchedClass) return

  return {
    type: 'text',
    content: matchedClass.data.response,
    senderId: conversation.subject_id
  }
}
