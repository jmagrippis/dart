import { getSessionPath, sessionsClient } from './client'

export interface DialogFlowEntity {
  name: string
  type: string
}

export interface DialogFlowIntent {
  name: string
  entities: DialogFlowEntity[]
}

export const identifyIntent = async ({
  content,
  conversationId
}: {
  content: string
  conversationId: string
}): Promise<DialogFlowIntent> => {
  const request = {
    session: getSessionPath(conversationId),
    queryInput: {
      text: {
        text: content,
        languageCode: 'en'
      }
    }
  }
  const [response] = await sessionsClient.detectIntent(request)

  if (!response) return

  const intentName = response.queryResult.intent.displayName

  const entities = Object.entries(response.queryResult.parameters.fields).map(
    ([type, value]) => ({
      type,
      // @ts-ignore
      name: value[value.kind]
    })
  )

  return {
    name: intentName,
    entities
  }
}
