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

export namespace FindTopicsByUserId {
  export type Variables = {
    userId: string
  }

  export type Query = {
    __typename?: 'Query'

    findTopicsByUserId: FindTopicsByUserId[]
  }

  export type FindTopicsByUserId = {
    __typename?: 'Topic'

    id: string

    name: string
  }
}

export namespace FindUserByEmail {
  export type Variables = {
    email: string
  }

  export type Query = {
    __typename?: 'Query'

    findUserByEmail: FindUserByEmail | null
  }

  export type FindUserByEmail = {
    __typename?: 'AuthenticatedUser'

    id: string

    displayName: string
  }
}
