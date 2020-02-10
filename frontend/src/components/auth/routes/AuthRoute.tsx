import React, { useEffect } from 'react'
import { useAuth } from '../auth.context'
import Router from 'next/router'

interface IAuthRoute {
  pathToRedirectTo?: string
  children: any
}

const AuthRoute: React.FC<IAuthRoute> = ({
  children,
  pathToRedirectTo = '/',
}) => {
  const { isLoggedIn } = useAuth()

  useEffect(() => {
    async function checkIfLoggedIn() {
      const loggedIn = await isLoggedIn()
      if (!loggedIn) {
        // Do something
        Router.push(pathToRedirectTo)
      }
    }
    checkIfLoggedIn()
  }, [])

  return children
}

export default AuthRoute
