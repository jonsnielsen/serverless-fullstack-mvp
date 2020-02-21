import { gql } from 'apollo-server-lambda'
import { postSchema } from './post'
import { helloSchema } from './hello'

const rootSchema = gql`
  type Query {
    root: String
  }

  type Mutation {
    root: String
  }
`
// https://medium.com/@choudlet/how-to-combine-graphql-type-definitions-quickly-and-easily-with-apollo-server-c96c4d9a7ea1
export default [rootSchema, postSchema, helloSchema]
