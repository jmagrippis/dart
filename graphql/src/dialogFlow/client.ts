import { v2beta1 } from 'dialogflow'

const projectId = 'digital-auto-response-tool'

export const sessionsClient = new v2beta1.SessionsClient()

export const getSessionPath = (sessionId) =>
  sessionsClient.sessionPath(projectId, sessionId)
