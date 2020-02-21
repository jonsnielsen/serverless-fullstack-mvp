import React from 'react'
import { NextPage } from 'next'
import { LayoutLoggedIn } from 'src/components/layout'
import AuthRoute from 'src/components/auth/routes/AuthRoute'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { withApollo } from 'src/lib/apollo'

// const TEST = gql`
//   query getGreeting($language: String!) {
//     greeting(language: $language) {
//       message
//     }
//   }
// `
const TEST = gql`
  query helloQuery {
    hello
  }
`

const Dashboard: NextPage = ({}) => {
  const { loading, error, data } = useQuery(TEST)
  // const result = useQuery(TEST)
  console.log({ data })
  return (
    // <AuthRoute>
    <LayoutLoggedIn>Dashboard</LayoutLoggedIn>
    // </AuthRoute>
  )
}

export default withApollo(Dashboard)
