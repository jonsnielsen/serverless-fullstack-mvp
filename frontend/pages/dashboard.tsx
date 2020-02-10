import React from 'react'
import { NextPage } from 'next'
import { LayoutLoggedIn } from 'src/components/layout'
import AuthRoute from 'src/components/auth/routes/AuthRoute'

const Dashboard: NextPage = ({}) => {
  return (
    <AuthRoute>
      <LayoutLoggedIn>Dashboard</LayoutLoggedIn>
    </AuthRoute>
  )
}

export default Dashboard
