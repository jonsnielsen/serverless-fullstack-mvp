# Getting started

## Frontend

### Deployment

run `npm run deploy` or `sls`

> Note: it might take up to 30 minutes before the url becomes works correctly as it has to propagate through the dns servers

## Backend

### Deployment

run `npm run deploy` or `sls deploy`

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
