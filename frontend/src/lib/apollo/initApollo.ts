import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { HttpLink, createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import { setContext } from 'apollo-link-context'
import { ENDPOINT_API_DEV, ENDPOINT_API_PROD } from 'src/config/config'
import { useAuth } from 'src/components/auth'

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
  uri:
    process.env.NODE_ENV === 'production'
      ? ENDPOINT_API_PROD
      : ENDPOINT_API_DEV,
  credentials: 'include', // Additional fetch() options like `credentials` or `headers`,
  fetch,
})
// good resource: https://github.com/apollographql/apollo-client/issues/2441
const authLink = ({ getAuthToken }: IOptions) =>
  setContext(async (_, { headers, ...rest }) => {
    // let token = await getAuthToken()

    const token =
      // 'eyJraWQiOiJ6RjVYK1BISUgzTTNKTVhQVzFFZCs3SnJpVXRrWVRsdjJnb01HSkRMQWhRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTZhNzk5OS0yMjg2LTRmM2EtYWZhNi0wMWIzNWIyZWZjOTciLCJhdWQiOiI1ZnRhaGNqMHRoZm91Z3M1cWE1b21iZTRqdiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjJlOGU4NzhlLTkwN2ItNDMxNy05YjdhLTg2ODVhMTJlNDA2MyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTgxMzQxOTg1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9Pb0xMbWJ1QmkiLCJuYW1lIjoiSm9uYXRoYW4gU3BhcnZhdGggTmllbHNlbiIsImNvZ25pdG86dXNlcm5hbWUiOiJqc3BhcnZhdGgiLCJleHAiOjE1ODEzNDU1ODYsImlhdCI6MTU4MTM0MTk4NiwiZW1haWwiOiJqb25hdGhhbi5zcGFydmF0aEBnbWFpbC5jb20ifQ.h9jhchV-ogeFGaqckZVJvHR0-FcDJirq-REVfKB6zZrTUn9yV4l61bLGSqQuZIPsAoiaLDOg7vTMVu7lqw8shTDhCnEcmHHouUGgalAx5FBPhvHVYRux4bTwZRb7YayKASTQxrgzVq2ZJcmAggeS0xy_HFzRCgn2XZc-1hl2FgXVDtux4HqM0sFVziAefC5x6tpwH81ri_OQQl2BPVY9G0wYOEJ2Ek_QYT2G__yaKit-tu2kbZ6c1iWOWyo2dweFG_6KCqXk2CD4vfkAg5RCC_2KvYj4Ig7YwroOkOJMMovX2oWLNcxwdXvfMqz7HJkebyOlY1QIdPpxBRdaooxXwQ'
      // 'eyJraWQiOiJ6RjVYK1BISUgzTTNKTVhQVzFFZCs3SnJpVXRrWVRsdjJnb01HSkRMQWhRPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiIzYTZhNzk5OS0yMjg2LTRmM2EtYWZhNi0wMWIzNWIyZWZjOTciLCJhdWQiOiI1ZnRhaGNqMHRoZm91Z3M1cWE1b21iZTRqdiIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJldmVudF9pZCI6IjJlOGU4NzhlLTkwN2ItNDMxNy05YjdhLTg2ODVhMTJlNDA2MyIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNTgxMzQxOTg1LCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAudXMtZWFzdC0xLmFtYXpvbmF3cy5jb21cL3VzLWVhc3QtMV9Pb0xMbWJ1QmkiLCJuYW1lIjoiSm9uYXRoYW4gU3BhcnZhdGggTmllbHNlbiIsImNvZ25pdG86dXNlcm5hbWUiOiJqc3BhcnZhdGgiLCJleHAiOjE1ODEzNDU1ODYsImlhdCI6MTU4MTM0MTk4NiwiZW1haWwiOiJqb25hdGhhbi5zcGFydmF0aEBnbWFpbC5jb20ifQ.h9jhchV-ogeFGaqckZVJvHR0-FcDJirq-REVfKB6zZrTUn9yV4l61bLGSqQuZIPsAoiaLDOg7vTMVu7lqw8shTDhCnEcmHHouUGgalAx5FBPhvHVYRux4bTwZRb7YayKASTQxrgzVq2ZJcmAggeS0xy_HFzRCgn2XZc-1hl2FgXVDtux4HqM0sFVziAefC5x6tpwH81ri_OQQl2BPVY9G0wYOEJ2Ek_QYT2G__yaKit-tu2kbZ6c1iWOWyo2dweFG_6KCqXk2CD4vfkAg5RCC_2KvYj4Ig7YwroOkOJMMovX2oWLNcxwdXvfMqz7HJkebyOlY1QIdPpxBRdaooxXwQ'
      'r0o1s6BMmZPD2LmjcKPs0GZovII96jc9ctQWLTqOO77L59mvvrcgYGSN2Skq3BXkSKvQWVGcHepQ4d2jPSGif2iKuzxjfeivul7diaoPdaC6AvRRbt3a1eKp7aIshLQoTVg9GF4etkbLDF3u2TcV7_55uRbIKYkYmQCRTlpGr7uNWTkwXMEJCSMpYBaQphobaRnyNrRfnYWhQejitrdTvWe0xyeAZT2R8EDmN09cvjWRKaRpeg'
    console.log({ token })
    return {
      headers: {
        ...headers,
        // authorization: token ? `Bearer ${token}` : '',
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
