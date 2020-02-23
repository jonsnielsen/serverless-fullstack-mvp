import React, { useState, createContext, useContext } from 'react'
import {
  AuthType,
  ISignupRequest,
  ISignupResponse,
  ILoginRequest,
  ILoginResponse,
  ILogoutResponse,
  IUser,
} from './auth.types'
import Auth from '@aws-amplify/auth'

interface IAuthContext {
  login(loginRequest: ILoginRequest): ILoginResponse
  logout(): ILogoutResponse
  signup(signupRequest: ISignupRequest): ISignupResponse
  isLoggedIn(): Promise<boolean>
  getAuthToken(): Promise<string | null>
  user: IUser | null
}
const AuthContext = createContext<IAuthContext | null>(null)

interface IAuthProvider {}
const AuthProvider: React.FC<IAuthProvider> = ({ ...rest }) => {
  const [user, setUser] = useState<IUser | null>(null)

  async function isLoggedIn() {
    if (user) return true
    try {
      const userInfo = await Auth.currentUserInfo()
      return !!userInfo
    } catch (err) {
      return false
    }
  }

  async function login({ email, password }: ISignupRequest) {
    try {
      const cognitoUser = await Auth.signIn(email, password)
      const idToken = cognitoUser.signInUserSession.idToken.jwtToken
      const userAttributes = cognitoUser.attributes
      const user: IUser = { idToken, ...userAttributes }
      setUser(user)
      return AuthType.LOGIN_SUCCESS
    } catch (err) {
      console.log('login error: ')
      return err.code
    }
  }

  async function logout() {
    try {
      await Auth.signOut()
      setUser(null)
      return AuthType.LOGOUT_SUCCESS
    } catch (err) {
      console.error('logout error: ', err)
      return err.code
    }
  }
  async function signup({ email, password, name, username }: ISignupRequest) {
    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          name,
        },
      })
      return AuthType.SIGNUP_SUCCESS
    } catch (err) {
      return err.code
    }
  }

  async function getAuthToken() {
    try {
      const userCred = await (await Auth.currentSession())
        .getIdToken()
        .getJwtToken()
      return userCred
    } catch (err) {
      console.log('no auth token, err: ', err)
      return null
    }
  }

  return (
    <AuthContext.Provider
      value={{
        getAuthToken: async () => await getAuthToken(),
        user,
        login,
        logout,
        isLoggedIn,
        signup,
      }}
      {...rest}
    />
  )
}

function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error(`useAuth must be used within a AuthProvider`)
  }
  return context
}

export { AuthProvider, useAuth }
