import DocumentHead from '../components/document-head'
import Image from 'next/image'
import Link from 'next/link'
import { getTagLink } from '../lib/blog-helpers'
import {
  BlogPostLink,
  BlogTagLink,
  TwitterTimeline,
} from '../components/blog-parts'

import styles from '../styles/page.module.css'
import SecStyles from '../styles/sec-notion.module.css'
import {
  getPosts,
  getRankedPosts,
  getAllTags,
  getAllBlocksByBlockId,
} from '../lib/notion/client'

import { INDEX_PAGE_ID } from '../lib/notion/server-constants'

import NotionBlocks from '../components/notion-block'

export async function getStaticProps() {
  const blocks = await getAllBlocksByBlockId(INDEX_PAGE_ID)
  const posts = await getPosts()
  const rankedPosts = await getRankedPosts()
  const tags = await getAllTags()

  return {
    props: {
      blocks,
      posts,
      rankedPosts,
      tags,
    },
    revalidate: 60,
  }
}

const RenderPage = ({ blocks, rankedPosts = [], tags = [] }) => (
  <div className={styles.container}>
    <DocumentHead />
    <div className={styles.mainContent}>
      <div className={styles.flexTagsMain}>
        {tags.map((tag) => {
          if (
            tag === '04_パワーアップ計画' ||
            tag === '02_ブログ改造日記' ||
            tag === '01_よくある質問' ||
            tag === '03_作業ページ改造'
          ) {
            return (
              <div className={styles.tagMain}>
                <Link href="/blog/tag/[tag]" as={getTagLink(tag)} passHref>
                  <p>{tag}</p>
                </Link>
              </div>
            )
          } else {
            return null
          }
        })}
        {/* 奇数だからお休み */}
        {/* <div className={styles.moreSearch}>
          <Link href="/blog" passHref>
            <p> 🔍　to Blog List </p>
          </Link>
        </div> */}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Image
          src="/hero-room.jpg"
          width={300}
          height={300}
          objectFit="contain"
          alt=""
        />
      </div>
      <NotionBlocks blocks={blocks} />
      <div className={SecStyles.pcode}>
        <iframe
          src="https://p5-blog.vercel.app/%E3%83%89%E3%83%83%E3%83%88/index.html"
          width="100%"
          height="100%"
          scrolling="no"
        ></iframe>
      </div>
    </div>

    <div className={styles.subContent}>
      <h3>Setup</h3>
      <hr />
      <ul>
        <li>
          <Link href="https://sparkling-cinnamon-3f9.notion.site/herohoro-48ff806d05484215b51b9dc79df15357">
            このブログを便利に使う方法⭐
          </Link>
        </li>
        <li>
          <Link href="https://herohoro.com/blog/tag/easy-notion-blog_%E4%BA%8B%E5%A7%8B%E3%82%81">
            easy-notion-blog導入⭐
          </Link>
        </li>
      </ul>

      <BlogTagLink heading="Tag List" tags={tags} />
      <h3>Prolile</h3>
      <hr />
      <div className={styles.flexWraper}>
        <Image
          src="/profile.png"
          width={200}
          height={200}
          objectFit="contain"
          alt=""
        />
        <Image
          src="/notion-essentials-badge.png"
          width={80}
          height={80}
          objectFit="contain"
          alt=""
        />
        <ul>
          <li>勉強が趣味</li>
          <li>教えるの好き</li>
          <li>オンライン学習塾で５画面を操り指導(自称：職人)</li>
          <li>元教員・介護士</li>
          <li>家の中では無限大</li>
        </ul>
      </div>
      <h3>Study TimeLine</h3>
      <hr />
      <iframe
        src="https://notion2charts.com/embed/bad01964-6bce-4f62-bc9d-1d2899652ed6"
        width="100%"
        height="400"
      ></iframe>

      <BlogPostLink heading="Recommended" posts={rankedPosts} />
      <TwitterTimeline />
    </div>
  </div>
)

export default RenderPage
