import { gql } from 'apollo-server'

export const typeDefs = gql`
  type User {
    id: ID!
    email: String!
  }

  type Query {
    user(id: String!): User
  }
`
