export default {
  Query: {
    hello: (root, args, ctx, info) => {
      return 'from hello resolver'
    },
  },
  Mutation: {},
}
