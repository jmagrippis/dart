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

export interface DbClass {
  id: string
  name: string
  user_id: string
  data: {
    response: string
    autocomplete: boolean
  }
}
