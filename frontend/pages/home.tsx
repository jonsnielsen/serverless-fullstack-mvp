import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { LayoutLoggedIn } from 'src/components/layout'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { withApollo } from 'src/lib/apollo'

const TEST = gql`
  mutation homeMutation {
    createPost {
      success
    }
  }
`

const Dashboard: NextPage = ({ }) => {
  const [createArticle, { data }] = useMutation(TEST)
  useEffect(() => {
    createArticle()
  }, [])

  console.log('createArticle')
  console.log(createArticle)
  console.log(data)
  return (
    // <AuthRoute>
    <LayoutLoggedIn>Dashboard</LayoutLoggedIn>
    // </AuthRoute>
  )
}

export default withApollo(Dashboard)
