import graphqlServer from './graphql/graphqlServer'

export const graphqlHandler = graphqlServer.createHandler({
  cors: {
    credentials: true,
    origin: true,
  },
})
