import { DynamoDB } from 'aws-sdk'
import uuid from 'uuid'
import { DataSource } from 'apollo-datasource'

const dynamoDb = new DynamoDB.DocumentClient()

export default class tagAPI extends DataSource {
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

  async createTag({
    userId,
    name,
    postIds,
  }: {
    userId: string
    name: string
    postIds: string[]
  }) {
    const params = {
      TableName: process.env.TAG_TABLE_NAME,
      Item: {
        userId,
        tagId: uuid(),
        name,
        postIds,
      },
    }
    return dynamoDb
      .put(params)
      .promise()
      .then(result => params.Item)
  }
}
