import { ANONYMOUS_USER } from '../../types'

export default {
  Query: {
    posts: (root, args, ctx, info) => {
      const userId = ctx.userId
    },
    post: (root, args, ctx, info) => {
      const { id } = args
    },
  },
  Mutation: {
    createPost: async (_, { title, content }, { dataSources, userId }) => {
      if (userId === ANONYMOUS_USER) {
        throw new Error('Anonymous users are not allowed to create posts!')
      }
      const newPost = await dataSources.postAPI.createPost({
        userId,
        title,
        content,
      })
      return {
        success: true,
        post: newPost,
      }
    },
  },
}
