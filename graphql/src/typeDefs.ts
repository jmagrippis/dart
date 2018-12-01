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

  interface Response {
    id: ID!
    user: User!
    topic: Topic!
    name: String!
    featured: Boolean!
  }

  type ParentResponse implements Response {
    id: ID!
    user: User!
    topic: Topic!
    name: String!
    responses: [Response!]!
    featured: Boolean!
  }

  type LeafResponse implements Response {
    id: ID!
    user: User!
    topic: Topic!
    name: String!
    content: String!
    featured: Boolean!
  }

  type Topic {
    id: ID!
    user: User!
    name: String!
    responses: [Response!]!
  }

  type Query {
    findUserByEmail(email: String!): AuthenticatedUser
    findUserByUsername(username: String!): AuthenticatedUser
    me: AuthenticatedUser

    findTopicsByUserId(userId: String!): [Topic!]!

    findResponses(
      userId: String!
      topicId: String!
      parentResponseId: String
    ): [Response!]!
    response(id: String!): Response

    conversation(subjectId: ID!, interviewerId: ID): Conversation!
  }

  type Mutation {
    addMessage(
      content: String!
      conversationId: ID!
      interviewerId: ID
    ): Message!
  }
`
