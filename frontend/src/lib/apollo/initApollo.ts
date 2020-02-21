import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink, createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import { setContext } from 'apollo-link-context'
// import { ENDPOINT_API_DEV, ENDPOINT_API_PROD } from 'src/config/config'
import { useAuth } from 'src/components/auth'
import { NO_TOKEN } from 'src/lib/apollo/apollo.constants'

let apolloClient: ApolloClient<NormalizedCacheObject> | null = null

interface IOptions {
  getAuthToken(): Promise<string | null>
}
/**
 * Always creates a new apollo client on the server
 * Creates or reuses apollo client in the browser.
 * @param  {Object} initialState
 */
export default function initApolloClient(
  initialState: NormalizedCacheObject = {},
  { getAuthToken }: IOptions
) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === 'undefined') {
    return createApolloClient(initialState, { getAuthToken })
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    apolloClient = createApolloClient(initialState, { getAuthToken })
  }

  return apolloClient
}

const httpLink = createHttpLink({
  uri: process.env.ENDPOINT_API,
  credentials: 'include', // Additional fetch() options like `credentials` or `headers`,
  fetch,
})
// good resource: https://github.com/apollographql/apollo-client/issues/2441
const authLink = ({ getAuthToken }: IOptions) =>
  setContext(async (_, { headers, ...rest }) => {
    let token = await getAuthToken()
    if (!token) {
      token = NO_TOKEN
    } else {
      token = `Bearer ${token}`
    }

    console.log(token)
    return {
      headers: {
        ...headers,
        authorization: token,
      },
    }
  })

/**
 * Creates and configures the ApolloClient
 * @param  {Object} [initialState={}]
 */
function createApolloClient(
  initialState: NormalizedCacheObject = {},
  { getAuthToken }: IOptions
) {
  // Check out https://github.com/zeit/next.js/pull/4611 if you want to use the AWSAppSyncClient
  return new ApolloClient({
    ssrMode: typeof window === 'undefined', // Disables forceFetch on the server (so queries are only run once)
    link: authLink({ getAuthToken }).concat(httpLink),
    cache: new InMemoryCache().restore(initialState),
  })
}
