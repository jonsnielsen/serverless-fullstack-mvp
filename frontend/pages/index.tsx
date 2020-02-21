import React from 'react'
import { NextPage } from 'next'
import { LayoutLoggedOut } from 'src/components/layout'
import { PublicRoute } from 'src/components/auth/redirect'

const Index: NextPage = props => {
  return (
    <PublicRoute redirectIfLoggedIn>
      <LayoutLoggedOut>Index</LayoutLoggedOut>
    </PublicRoute>
  )
}

export default Index
