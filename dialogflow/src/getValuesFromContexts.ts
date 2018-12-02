import { DialogflowConversation } from 'actions-on-google'

import { CONTEXTS } from './app'
import { FindUserByEmail, FindTopicsByUserId, FindResponses } from './types'

type ContextValues = {
  subject: FindUserByEmail.FindUserByEmail
  topics?: FindTopicsByUserId.FindTopicsByUserId[]
  responses?: FindResponses.FindResponses[]
}

export const getValuesFromContexts = (
  conv: DialogflowConversation
): ContextValues => {
  const subjectContext = conv.contexts.get(CONTEXTS.SUBJECT)
  // @ts-ignore
  const subject: FindUserByEmail.FindUserByEmail =
    subjectContext.parameters.subject

  const topicsContext = conv.contexts.get(CONTEXTS.TOPICS)
  // @ts-ignore
  const topics: FindTopicsByUserId.FindTopicsByUserId[] =
    topicsContext && topicsContext.parameters && topicsContext.parameters.topics
      ? topicsContext.parameters.topics
      : undefined

  const responsesContext = conv.contexts.get(CONTEXTS.RESPONSES)
  // @ts-ignore
  const responses: FindResponses.FindResponses[] =
    responsesContext &&
    responsesContext.parameters &&
    responsesContext.parameters.responses
      ? responsesContext.parameters.responses
      : undefined

  return { subject, topics, responses }
}
