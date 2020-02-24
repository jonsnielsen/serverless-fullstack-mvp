# Getting started

## Prerequisites

an account on AWS  
Node.js  
NPM  
Serverless framework (`npm i -g serverless`)
An account and app on Serverless Dashboard -> Sign up on https://serverless.com/dashboard/ 

useful videos:  
https://serverless.com/learn/tutorial/create-an-aws-account/  
https://serverless.com/learn/tutorial/installing-serverless-framework-via-npm/
https://serverless.com/learn/tutorial/using-profiles-in-serverless-dashboard/



## Deployment

### Backend

cd into the folder of each service and firstly run `npm install`. Then run `npm run deploy` for deploying to staging environment or `npm run deploy-prod` for deploying to production environment.

Some steps need to be taken in a specific order since some services rely on resources from the other services. 

1. In the file backend/serverless.config.json, modify the values "region", "appName" and  "awsProfile"
2. Deploy backend/services/user-pool 
3. Deploy backend/services/database
4. In the file backend/serverless.config.json, modify the values for "cognitoIssuer". The values can be found in the "Cognito" service in the AWS Management Console
5. In the file backend/services/api/serverless.yml modify the values for "org", "app" and "region"
6. Deploy backend/services/api

### Frontend


cd into frontend/ and run `npm run deploy` or `sls`

> Note: it might take up to 30 minutes before the url becomes works correctly as it has to propagate through the dns servers

# Using custom domain

## In the front end

Follow the guides in this video series:
https://serverless.com/learn/tutorial/amazon-route-53-domain-registration/

Add the following to the in the app in frontend/serverless.yml:

```
inputs:
  domain: ["www", "<MYDOMAIN>"]
```

Notes: It might take

# Resources and links

Serverless component - Nextjs: https://serverless.com/blog/serverless-nextjs/

### Serverless

https://www.youtube.com/watch?v=UGrGce6-cX4&t=1851s (David wells)
https://www.alexdebrie.com/posts/lambda-custom-authorizers/#custom-authorizer-responses

### GraphQL

https://www.formidable.com/blog/2019/strong-typing/

### Dynamodb

https://www.dynamodbguide.com/  
https://www.alexdebrie.com/posts/dynamodb-single-table/ (key takeaway: When using graphql, use seperate tables per data model instead of single-table-design)
https://www.youtube.com/watch?v=HaEPXoXVf2k (key takeaways: use eventually consistent )

### CORS

https://serverless.com/blog/cors-api-gateway-survival-guide/
https://serverless.com/framework/docs/providers/aws/events/apigateway/#enabling-cors
