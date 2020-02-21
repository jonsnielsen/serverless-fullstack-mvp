// import { ENDPOINT_DEV, ENDPOINT_PROD } from './config'
export default {
  Auth: {
    region: process.env.REGION,
    userPoolId: process.env.USER_POOL_ID,
    userPoolWebClientId: process.env.USER_POOL_WEB_CLIENT_ID,
    // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
    mandatorySignIn: false,
    // OPTIONAL - Configuration for cookie storage
    cookieStorage: {
      domain: process.env.ENDPOINT,
      path: '/',
      // OPTIONAL - Cookie expiration in days
      expires: 365,
      // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
      secure: process.env.STAGE === 'dev' ? false : true,
    },
    // OPTIONAL - customized storage object
    // storage: new MyStorage(),
    // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
    // authenticationFlowType: 'USER_PASSWORD_AUTH',
    // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
    // clientMetadata: { myCustomKey: 'myCustomValue' },
  },
}
