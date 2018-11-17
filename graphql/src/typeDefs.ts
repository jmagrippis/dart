import { gql } from 'apollo-server'

export const typeDefs = gql`
  interface User {
    id: ID!
  }

  type AuthenticatedUser implements User {
    id: ID!
    email: String!
    username: String!
    displayName: String!
  }

  type AnonymousUser implements User {
    id: ID!
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
    conversation(username: String!, interviewerId: ID): Conversation!
  }

  type Mutation {
    addMessage(content: String!, interviewerId: ID): Message!
  }
`
