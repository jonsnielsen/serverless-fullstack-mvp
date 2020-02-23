import { ANONYMOUS_USER } from '../../types'

export default {
  Query: {
    tags: (root, args, ctx, info) => {
      const userId = ctx.userId
    },
    tag: (root, args, ctx, info) => {
      const { id } = args
    },
  },
  Mutation: {
    createTag: async (_, { name, postIds }, { dataSources, userId }) => {
      if (userId === ANONYMOUS_USER) {
        throw new Error('Anonymous users are not allowed to create tags!')
      }
      const newTag = await dataSources.tagAPI.createTag({
        userId,
        name,
        postIds,
      })
      return {
        success: true,
        tag: newTag,
      }
    },
  },
}
