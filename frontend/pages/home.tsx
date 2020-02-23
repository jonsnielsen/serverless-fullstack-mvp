import React, { useEffect } from 'react'
import { NextPage } from 'next'
import { LayoutLoggedIn } from 'src/components/layout'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'
import { withApollo } from 'src/lib/apollo'

const TEST = gql`
  mutation homeMutation {
    createPost(input: { title: "Post 1", content: "Post 1 content" }) {
      success
    }
  }
`

const Home: NextPage = ({}) => {
  const [createPost, { data }] = useMutation(TEST)
  useEffect(() => {
    createPost()
  }, [])

  console.log(data)
  return (
    // <AuthRoute>
    <LayoutLoggedIn>Home</LayoutLoggedIn>
    // </AuthRoute>
  )
}

export default withApollo(Home)
