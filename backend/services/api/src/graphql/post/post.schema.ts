import { gql } from 'apollo-server-lambda'

const typeDefs = gql`
  extend type Query {
    posts: [Article]!
    post(postId: ID!): Article
  }

  extend type Mutation {
    createPost(title: String, content: String): PostUpdateResponse!
  }

  type Post {
    userId: ID!
    postId: ID!
    title: String!
    content: String
  }

  type PostUpdateResponse {
    success: Boolean!
    post: Post
  }
`
export default typeDefs
