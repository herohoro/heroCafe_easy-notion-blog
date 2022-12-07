import { NEXT_PUBLIC_SITE_TITLE } from './server-constants'
import GoogleAnalytics from '../components/google-analytics'
import styles from '../styles/page.module.css'
import {
  getRankedPosts,
  getAllTags,
  getAllBlocksByBlockId,
  getAllCategorys,
} from '../lib/notion/client'
import { INDEX_PAGE_ID } from '../app/server-constants'
import NotionBlocks from '../components/notion-block'
import {
  BlogPostLink,
  BlogTagLink,
  BlogCategoryLink,
} from '../components/blog-parts'
import { PROFILE_PAGE_ID } from '../app/server-constants'

export const revalidate = 60

const RootPage = async () => {
  const [blocks, profileblocks, rankedPosts, tags, categorys] =
    await Promise.all([
      getAllBlocksByBlockId(INDEX_PAGE_ID),
      getAllBlocksByBlockId(PROFILE_PAGE_ID),
      getRankedPosts(),
      getAllTags(),
      getAllCategorys(),
    ])
  return (
    <>
      <GoogleAnalytics pageTitle={NEXT_PUBLIC_SITE_TITLE} />
      <div className={styles.container}>
        <div className={styles.mainContent}>
          <NotionBlocks blocks={blocks} />
        </div>
        <div className={styles.subContent}>
          <BlogCategoryLink heading="Category List" categorys={categorys} />
          <BlogTagLink heading="Tag List" tags={tags} />

          <h3>Prolile</h3>
          <hr />
          <NotionBlocks blocks={profileblocks} />

          <BlogPostLink heading="Recommended" posts={rankedPosts} />
        </div>
      </div>
    </>
  )
}

export default RootPage
