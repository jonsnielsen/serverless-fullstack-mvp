export enum AuthType {
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  SIGNUP_SUCCESS,
  USERNAME_EXISTS = 'UsernameExistsException',
  NOT_AUTHORIZED = 'NotAuthorizedException',
  INVALID_PASSWORD = 'InvalidPasswordException',
  USER_NOT_CONFIRMED = 'UserNotConfirmedException',
}

export interface IUser {
  sub: string
  name: string
  email: string
  idToken: string
}

export interface ILoginRequest {
  email: string
  password: string
}
export type ILoginResponse = Promise<AuthType.LOGIN_SUCCESS | string>

export type ILogoutResponse = Promise<AuthType.LOGOUT_SUCCESS | string>

export interface ISignupRequest {
  email: string
  password: string
  name: string
  username: string
}
export type ISignupResponse = Promise<AuthType.SIGNUP_SUCCESS | string>
