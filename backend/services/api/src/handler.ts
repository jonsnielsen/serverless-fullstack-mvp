import { endpoints } from '../../../serverless.config.json'
import graphqlServer from './graphql/graphqlServer'
import { authorize } from './auth'

export const authHandler = authorize
// const DEFAULT_ORIGIN = 'https://d34hflbtdv6v8m.cloudfront.net'
// const ALLOWED_ORIGINS = [
//   'https://d34hflbtdv6v8m.cloudfront.net',
//   'http://localhost:3000',
// ]
export const graphqlHandler = (event, context, callback) => {
  const origin: string = endpoints[process.env.STAGE].includes(
    event.headers.origin
  )
    ? event.headers.origin
    : ''
  // if (ALLOWED_ORIGINS.includes(event.headers.origin)) {
  //   origin = event.headers.origin
  // } else {
  //   origin = '*'
  // }

  const handler = graphqlServer.createHandler({
    cors: {
      origin,
      credentials: true,
    },
  })

  return handler(event, context, callback)
}
