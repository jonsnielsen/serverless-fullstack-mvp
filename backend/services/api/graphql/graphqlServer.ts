const { ApolloServer } = require("apollo-server-lambda");
import resolvers from "./resolvers";
import typeDefs from "./typeDefs";

// Construct a schema, using GraphQL schema language

export default new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  })
});
