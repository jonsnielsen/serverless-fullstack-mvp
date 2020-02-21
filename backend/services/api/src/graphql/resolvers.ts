import { merge } from 'lodash'
import { postResolvers } from './post'
import { helloResolvers } from './hello'

const resolvers = merge(postResolvers, helloResolvers)

export default resolvers
