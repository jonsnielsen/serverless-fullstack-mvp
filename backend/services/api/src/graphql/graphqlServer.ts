import { ApolloServer } from 'apollo-server-lambda'
import resolvers from './resolvers'
import typeDefs from './schema'
import dataSources from './dataSources'

export default new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  context: ({ event, context }) => {
    return {
      userId: event.requestContext.authorizer.principalId,
      headers: event.headers,
      functionName: context.functionName,
      event,
      context,
    }
  },
})
