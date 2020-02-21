# Getting started

## Tools needed

an account on AWS  
Node.js  
NPM  
Serverless framework (`npm i -g serverless`)

useful videos:  
https://serverless.com/learn/tutorial/create-an-aws-account/  
https://serverless.com/learn/tutorial/installing-serverless-framework-via-npm/

## Frontend

### Deployment

run `npm run deploy` or `sls`

> Note: it might take up to 30 minutes before the url becomes works correctly as it has to propagate through the dns servers

## Backend

### Deployment

run `npm run deploy` or `sls deploy`

> Note: you need to have an account on the _serverless dashboard_. To create or login, run `sls login`. useful video: https://serverless.com/learn/tutorial/using-profiles-in-serverless-dashboard/

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

# deploying first time

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
