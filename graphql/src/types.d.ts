export enum MessageType {
  text = 'text'
}

export enum CacheControlScope {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE'
}

/** The `Upload` scalar type represents a file upload promise that resolves an object containing `stream`, `filename`, `mimetype` and `encoding`. */
export type Upload = any

// ====================================================
// Scalars
// ====================================================

// ====================================================
// Interfaces
// ====================================================

export interface User {
  id: string
}

// ====================================================
// Types
// ====================================================

export interface Query {
  findUserByUsername?: AuthenticatedUser | null

  conversation: Conversation
}

export interface AuthenticatedUser extends User {
  id: string

  email: string

  username: string

  displayName: string
}

export interface Conversation {
  id: string

  interviewer: User

  subject: AuthenticatedUser

  messages: Message[]
}

export interface Message {
  id: string

  type: MessageType

  content: string

  sender: User
}

export interface Mutation {
  addMessage: Message
}

export interface AnonymousUser extends User {
  id: string
}

// ====================================================
// Arguments
// ====================================================

export interface FindUserByUsernameQueryArgs {
  username: string
}
export interface ConversationQueryArgs {
  subjectId: string

  interviewerId?: string | null
}
export interface AddMessageMutationArgs {
  content: string

  conversationId: string

  interviewerId?: string | null
}
