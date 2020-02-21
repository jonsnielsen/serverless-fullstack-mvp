// const AWS = require('aws-sdk')
// const dynamoDb = new AWS.DynamoDB.DocumentClient()
// const uuid = require('uuid')

export default {
  Query: {
    hello: (root, args, ctx, info) => {
      // console.log('args from resolver')
      // console.log(JSON.stringify(args))

      console.log('in resolver')
      console.log('in resolver')
      console.log('in resolver')
      console.log('userid: ', ctx.userId)

      return 'from hello resolver'
    },
  },
  Mutation: {},
}
