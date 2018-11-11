import { gql } from 'apollo-server'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
    username: String!
    displayName: String!
  }

  type Query {
    findUserByUsername(username: String!): User
  }
`
