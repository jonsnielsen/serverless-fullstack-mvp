import { postAPI } from './post'
import { tagAPI } from './tag'

export default () => ({
  postAPI: new postAPI(),
  tagAPI: new tagAPI(),
})
