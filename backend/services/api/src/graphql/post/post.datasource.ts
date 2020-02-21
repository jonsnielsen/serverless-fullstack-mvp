import { DynamoDB } from 'aws-sdk'
import uuid from 'uuid'
import { DataSource } from 'apollo-datasource'

const dynamoDb = new DynamoDB.DocumentClient()

export default class postAPI extends DataSource {
  constructor() {
    super()
  }

  /**
   * This is a function that gets called by ApolloServer when being setup.
   * This function gets called with the datasource config including things
   * like caches and context. We'll assign this.context to the request context
   * here, so we can know about the user making requests
   */
  initialize(config) {
    // @ts-ignore
    this.context = config.context
  }

  async createPost({
    userId,
    title,
    content,
  }: {
    userId: string
    title: string
    content: string
  }) {
    const params = {
      TableName: process.env.POST_TABLE_NAME,
      Item: {
        userId,
        postId: uuid(),
        title,
        content,
      },
    }
    return dynamoDb
      .put(params)
      .promise()
      .then(result => params.Item)
  }
}
