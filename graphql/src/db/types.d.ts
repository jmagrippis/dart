export interface DbUser {
  id: string
  username: string
  data: {
    displayName: string
    email: string
  }
  createdAt: string
}

export interface DbConversation {
  id: string
  subjectId: string
  interviewerId: string
}

export interface DbMessage {
  id: string
  conversationId: string
  data: {
    senderId: string
    type: string
  }
}
