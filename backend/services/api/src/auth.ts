import * as jwk from 'jsonwebtoken'
import * as jwkToPem from 'jwk-to-pem'
import * as request from 'request'
import { ANONYMOUS_USER } from './types'
import { cognitoIssuer } from '../../../serverless.config.json'

const iss = cognitoIssuer[process.env.STAGE]

// Generate policy to allow this user on this API:
const generatePolicy = (
  principalId: string,
  effect: string,
  resource: string
) => {
  const authResponse: any = {}
  authResponse.principalId = principalId
  if (effect && resource) {
    const policyDocument: any = {}
    policyDocument.Version = '2012-10-17'
    policyDocument.Statement = []
    const statementOne: any = {}
    statementOne.Action = 'execute-api:Invoke'
    statementOne.Effect = effect
    statementOne.Resource = resource
    policyDocument.Statement[0] = statementOne
    authResponse.policyDocument = policyDocument
  }
  return authResponse
}

export const authorize = (event, context, cb) => {
  if (!event.authorizationToken || event.authorizationToken === 'NO_TOKEN') {
    console.log('no auth token')
    // In case there is no authorization, allow the request to go through but set the principalId as anonymous user
    cb(null, generatePolicy(ANONYMOUS_USER, 'Allow', event.methodArn))
  } else {
    // Remove 'bearer ' from token:
    const token = event.authorizationToken.substring(7)
    // Make a request to the iss + .well-known/jwks.json URL:
    request(
      { url: `${iss}/.well-known/jwks.json`, json: true },
      (error, response, body) => {
        if (error || response.statusCode !== 200) {
          // In case jwks couldn't be fetched
          cb('Unauthorized')
        }
        const keys = body
        const k = keys.keys[0]
        const jwkArray = {
          kty: k.kty,
          n: k.n,
          e: k.e,
        }
        const pem = jwkToPem(jwkArray)
        // Verify the token:
        jwk.verify(token, pem, { issuer: iss }, (err, decoded: any) => {
          if (err) {
            // In case the provided token is invalid, reject the request
            console.log('Unauthorized user:', err.message)
            cb('Unauthorized')
          } else {
            console.log('user is authorized')
            const response = generatePolicy(
              // set the sub (user id) as the principalId
              decoded.sub,
              'Allow',
              event.methodArn
            )
            cb(null, response)
          }
        })
      }
    )
  }
}
