import { gql } from 'apollo-server-lambda'

const typeDefs = gql`
  extend type Query {
    posts: [Post]!
    post(postId: ID!): Post
  }

  extend type Mutation {
    createPost(input: PostCreateInput!): PostUpdateResponse!
  }

  type Post {
    userId: ID!
    postId: ID!
    title: String!
    content: String
    # tags: [Tag!]!
  }

  input PostCreateInput {
    title: String!
    content: String
  }

  type PostUpdateResponse {
    success: Boolean!
    post: Post
  }
`
export default typeDefs
