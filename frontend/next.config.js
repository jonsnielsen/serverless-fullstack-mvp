module.exports = {
  target: 'serverless',
  webpack: config => {
    // Fixes absolute imports in typescripts
    config.resolve.modules.push(__dirname)
    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    }
    return config
  },
  env: {
    STAGE: process.env.STAGE,
    REGION: '<AWS_REGION>',
    ENDPOINT:
      process.env.STAGE === 'dev'
        ? 'localhost'
        : process.env.STAGE === 'staging'
        ? '<FRONTEND_ENDPOINT_STAGING>'
        : '<FRONTEND_ENDPOINT_PROD',
    ENDPOINT_API:
      process.env.STAGE === 'dev' || process.env.STAGE === 'staging'
        ? '<BACKEND_ENDPOINT_STAGING>'
        : '<BACKEND_ENDPOINT_PROD>',
    USER_POOL_ID:
      process.env.STAGE === 'dev' || process.env.STAGE === 'staging'
        ? '<USER_POOL_ID_STAGING>' // eg.  eu-west-2_abcdefgh
        : '<USER_POOL_ID_PROD>',
    USER_POOL_WEB_CLIENT_ID:
      process.env.STAGE === 'dev' || process.env.STAGE === 'staging'
        ? '<USER_POOL_WEB_CLIENT_ID_STAGING>' // 123abc456789defga
        : '<USER_POOL_WEB_CLIENT_ID_PROD>',
  },
}
