import { NEXT_PUBLIC_SITE_TITLE } from './server-constants'
import GoogleAnalytics from '../components/google-analytics'
import styles from '../styles/page.module.css'
import {
  getPosts,
  getRankedPosts,
  getAllTags,
  getAllBlocksByBlockId,
  getAllCategorys,
} from '../lib/notion/client'
import { INDEX_PAGE_ID } from '../app/server-constants'

import Image from 'next/image'
import NotionBlocks from '../components/notion-block'

import {
  BlogPostLink,
  BlogTagLink,
  BlogCategoryLink,
} from '../components/blog-parts'

export const revalidate = 60

const RootPage = async () => {
  const [blocks, posts, rankedPosts, tags, categorys] = await Promise.all([
    getAllBlocksByBlockId(INDEX_PAGE_ID),
    getPosts(),
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
          <div className={styles.flexWraper}>
            <Image
              src="/profile.png"
              width={200}
              height={200}
              style={{ objectFit: 'contain' }}
              alt=""
            />
          </div>
          <ul>
            <li>勉強が趣味</li>
            <li>教えるの好き</li>
            <li>オンライン学習塾で５画面を操り指導(自称：職人)</li>
            <li>元教員・介護士</li>
            <li>家の中では無限大</li>
          </ul>

          <BlogPostLink heading="Recommended" posts={rankedPosts} />
        </div>
      </div>
    </>
  )
}

export default RootPage
