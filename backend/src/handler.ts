import graphqlServer from "./api/graphqlServer";

export const graphqlHandler = graphqlServer.createHandler({
  cors: {
    credentials: true,
    origin: true
  }
});
