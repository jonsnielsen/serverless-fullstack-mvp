import React, { useEffect } from 'react'
import { useAuth } from '../auth.context'
import Router from 'next/router'

interface IPublicRoute {
  redirectIfLoggedIn: boolean
  pathToRedirectTo?: string
  children: any
}
const PublicRoute: React.FC<IPublicRoute> = ({
  pathToRedirectTo = '/dashboard',
  redirectIfLoggedIn,
  children,
}) => {
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    async function checkIsLoggedIn() {
      const loggedIn = await isLoggedIn()
      if (loggedIn && redirectIfLoggedIn) {
        Router.push(pathToRedirectTo)
      }
    }
    checkIsLoggedIn()
  }, [])

  return children
}

export default PublicRoute
