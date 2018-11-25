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
// Documents
// ====================================================

export namespace Me {
  export type Variables = {}

  export type Query = {
    __typename?: 'Query'

    me: Me | null
  }

  export type Me = {
    __typename?: 'AuthenticatedUser'

    id: string

    email: string

    username: string

    displayName: string
  }
}

export namespace Conversation {
  export type Variables = {
    subjectId: string
    interviewerId?: string | null
  }

  export type Query = {
    __typename?: 'Query'

    conversation: Conversation
  }

  export type Conversation = {
    __typename?: 'Conversation'

    id: string

    messages: Messages[]
  }

  export type Messages = {
    __typename?: 'Message'

    id: string

    content: string

    sender: Sender
  }

  export type Sender = {
    __typename?: 'User'

    id: string
  }
}

export namespace AddMessage {
  export type Variables = {
    content: string
    conversationId: string
    interviewerId?: string | null
  }

  export type Mutation = {
    __typename?: 'Mutation'

    addMessage: AddMessage
  }

  export type AddMessage = {
    __typename?: 'Message'

    id: string

    content: string

    sender: Sender
  }

  export type Sender = {
    __typename?: 'User'

    id: string
  }
}

export namespace FindUserByUsername {
  export type Variables = {
    username: string
  }

  export type Query = {
    __typename?: 'Query'

    findUserByUsername: FindUserByUsername | null
  }

  export type FindUserByUsername = {
    __typename?: 'AuthenticatedUser'

    id: string

    username: string

    displayName: string
  }
}
