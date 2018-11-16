import { gql } from 'apollo-server'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    displayName: String!
  }

  type AnonymousUser {
    id: ID!
  }

  enum MessageType {
    text
  }

  union Sender = User | AnonymousUser

  type Message {
    id: ID!
    type: MessageType!
    content: String!
    sender: Sender!
  }

  type Conversation {
    interviewer: User!
    subject: User!
    messages: [Message!]!
  }

  type Query {
    findUserByUsername(username: String!): User
    conversation(username: String!, interviewerId: String): Conversation!
  }
`
