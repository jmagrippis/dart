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

export interface Response {
  id: string

  user: User

  topic: Topic

  name: string

  featured: boolean
}

// ====================================================
// Types
// ====================================================

export interface Query {
  findUserByEmail?: AuthenticatedUser | null

  findUserByName?: AuthenticatedUser | null

  findUserByUsername?: AuthenticatedUser | null

  me?: AuthenticatedUser | null

  findTopicsByUserId: Topic[]

  findResponses: Response[]

  response?: Response | null

  conversation: Conversation
}

export interface AuthenticatedUser extends User {
  id: string

  email: string

  displayName: string

  username?: string | null
}

export interface Topic {
  id: string

  user: User

  name: string

  responses: Response[]
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

export interface ParentResponse extends Response {
  id: string

  user: User

  topic: Topic

  name: string

  responses: Response[]

  featured: boolean
}

export interface LeafResponse extends Response {
  id: string

  user: User

  topic: Topic

  name: string

  content: string

  featured: boolean
}

// ====================================================
// Arguments
// ====================================================

export interface FindUserByEmailQueryArgs {
  email: string
}
export interface FindUserByNameQueryArgs {
  givenName: string

  lastName: string
}
export interface FindUserByUsernameQueryArgs {
  username: string
}
export interface FindTopicsByUserIdQueryArgs {
  userId: string
}
export interface FindResponsesQueryArgs {
  userId: string

  topicId: string

  parentResponseId?: string | null
}
export interface ResponseQueryArgs {
  id: string
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
