import React from 'react'
import Head from 'next/head'
import { ApolloProvider } from '@apollo/react-hooks'
import { ApolloClient } from 'apollo-client'
import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { NextPage, NextPageContext } from 'next'
import initApollo from './initApollo'
import { useAuth } from 'src/components/auth'
import { IUser } from 'src/components/auth/auth.types'

/**
 * Creates and provides the apolloContext
 * to a next.js PageTree. Use it by wrapping
 * your PageComponent via HOC pattern.
 * @param {Function|Class} PageComponent
 * @param {Object} [config]
 * @param {Boolean} [config.ssr=true]
 */
export function withApollo<PageProps>(
  PageComponent: NextPage<PageProps>,
  { ssr = true } = {}
) {
  type ApolloPageProps = PageProps & {
    apolloClient?: ApolloClient<NormalizedCacheObject> | null
    apolloState?: NormalizedCacheObject
  }
  // @ts-ignore
  const WithApollo: NextPage<ApolloPageProps> = ({
    apolloClient,
    apolloState,
    ...pageProps
  }) => {
    const { getAuthToken } = useAuth()
    const client = apolloClient || initApollo(apolloState, { getAuthToken })
    return (
      <ApolloProvider client={client}>
        <PageComponent {...((pageProps as any) as PageProps)} />
      </ApolloProvider>
    )
  }

  // Set the correct displayName in development
  if (process.env.NODE_ENV !== 'production') {
    const displayName =
      PageComponent.displayName || PageComponent.name || 'Component'

    if (displayName === 'App') {
      console.warn('This withApollo HOC only works with PageComponents.')
    }

    WithApollo.displayName = `withApollo(${displayName})`
  }

  return WithApollo
}
