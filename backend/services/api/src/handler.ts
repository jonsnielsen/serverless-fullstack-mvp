import { endpoints } from '../../../serverless.config.json'
import graphqlServer from './graphql/graphqlServer'
import { authorize } from './auth'

export const authHandler = authorize

export const graphqlHandler = (event, context, callback) => {
  const origin: string = endpoints[process.env.STAGE].includes(
    event.headers.origin
  )
    ? event.headers.origin
    : ''
  console.log('in graphql handler, origin: ', origin)

  const handler = graphqlServer.createHandler({
    cors: {
      origin,
      credentials: true,
    },
  })

  return handler(event, context, callback)
}
