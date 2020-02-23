import { gql } from 'apollo-server-lambda'

const typeDefs = gql`
  extend type Query {
    tags: [Tag]!
    tag(tagId: ID!): Tag
  }

  extend type Mutation {
    createTag(input: TagCreateInput): TagUpdateResponse!
  }

  type Tag {
    tagId: ID!
    userId: ID!
    name: String!
    posts: [Post!]!
  }

  input TagCreateInput {
    name: String!
    posts: [Post!]!
  }

  type TagUpdateResponse {
    success: Boolean!
    tag: Tag
  }
`
export default typeDefs
