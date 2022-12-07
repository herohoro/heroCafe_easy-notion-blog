/* eslint @typescript-eslint/no-var-requires: 0 */
// use commonjs so it can be required without transpiling

const path = require('path')

const NOTION_API_SECRET = process.env.NOTION_API_SECRET
const DATABASE_ID = process.env.DATABASE_ID
const INDEX_PAGE_ID = process.env.INDEX_PAGE_ID
const PROFILE_PAGE_ID = process.env.PROFILE_PAGE_ID
const NEXT_PUBLIC_URL = process.env.NEXT_PUBLIC_URL
const NEXT_PUBLIC_GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID
const NEXT_PUBLIC_SITE_TITLE = process.env.NEXT_PUBLIC_SITE_TITLE
const NEXT_PUBLIC_SITE_DESCRIPTION = process.env.NEXT_PUBLIC_SITE_DESCRIPTION

const BLOG_INDEX_CACHE = path.resolve('.blog_index_data')
const NUMBER_OF_POSTS_PER_PAGE = 10

module.exports = {
  NOTION_API_SECRET,
  DATABASE_ID,
  INDEX_PAGE_ID,
  PROFILE_PAGE_ID,
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_GA_TRACKING_ID,
  NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_SITE_DESCRIPTION,
  BLOG_INDEX_CACHE,
  NUMBER_OF_POSTS_PER_PAGE,
}
