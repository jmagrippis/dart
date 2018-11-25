import { gql } from 'apollo-server'

export const typeDefs = gql`
  interface User {
    id: ID!
  }

  type AnonymousUser implements User {
    id: ID!
  }

  type AuthenticatedUser implements User {
    id: ID!
    email: String!
    displayName: String!
    username: String
  }

  enum MessageType {
    text
  }

  type Message {
    id: ID!
    type: MessageType!
    content: String!
    sender: User!
  }

  type Conversation {
    id: ID!
    interviewer: User!
    subject: AuthenticatedUser!
    messages: [Message!]!
  }

  type Query {
    findUserByUsername(username: String!): AuthenticatedUser
    conversation(subjectId: ID!, interviewerId: ID): Conversation!
    me: AuthenticatedUser
  }

  type Mutation {
    addMessage(
      content: String!
      conversationId: ID!
      interviewerId: ID
    ): Message!
  }
`
