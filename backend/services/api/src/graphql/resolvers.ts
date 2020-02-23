import { merge } from 'lodash'
import { postResolvers } from './post'
import { tagResolvers } from './tag'

const resolvers = merge(postResolvers, tagResolvers)

export default resolvers
