export interface DbUser {
  id: string
  username: string
  email: string
  data: {
    displayName: string
  }
  createdAt: string
}

export interface DbConversation {
  id: string
  subject_id: string
  interviewer_id: string
}

export interface MessageData {
  type: string
  content: string
  senderId: string
}

export interface DbMessage {
  id: string
  conversation_id: string
  data: MessageData
}

export interface Entity {
  name: string
  response: string
}

export interface DbIntent {
  id: string
  user_id: string
  name: string
  data: {
    response?: string
    entities?: {
      [key: string]: Entity
    }
  }
}
