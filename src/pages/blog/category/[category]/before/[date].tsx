import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { getBeforeLink } from '../../../../../lib/blog-helpers'
import { NUMBER_OF_POSTS_PER_PAGE } from '../../../../../lib/notion/server-constants'
import DocumentHead from '../../../../../components/document-head'
import {
  BlogPostLink,
  BlogCategoryLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostTitle,
  PostsNotFound,
  PostThumbnail,
  TwitterTimeline,
  //   NextPageLinkCategory,
} from '../../../../../components/blog-parts'

import {
  getPosts,
  getRankedPosts,
  getPostsByCategoryBefore,
  getFirstPostByCategory,
  getAllCategorys,
} from '../../../../../lib/notion/client'

import stylesParts from '../../../../../styles/blog-parts.module.css'
import styles from '../../../../../styles/blog.module.css'

export async function getStaticProps({ params: { category, date } }) {
  if (!Date.parse(date) || !/\d{4}-\d{2}-\d{2}/.test(date)) {
    return { notFound: true }
  }

  const posts = await getPostsByCategoryBefore(
    category,
    date,
    NUMBER_OF_POSTS_PER_PAGE
  )

  if (posts.length === 0) {
    console.log(`Failed to find posts for tag: ${category}`)
    return {
      props: {
        redirect: '/blog',
      },
      revalidate: 30,
    }
  }

  const [firstPost, rankedPosts, recentPosts, categorys] = await Promise.all([
    getFirstPostByCategory(category),
    getRankedPosts(),
    getPosts(5),
    getAllCategorys(),
  ])

  return {
    props: {
      date,
      posts,
      firstPost,
      rankedPosts,
      recentPosts,
      categorys,
      category,
    },
    revalidate: 3600,
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

const RenderPostsByCategoryBeforeDate = ({
  date,
  posts = [],
  firstPost,
  rankedPosts = [],
  recentPosts = [],
  categorys = [],
  category,
  redirect,
}) => {
  const router = useRouter()

  useEffect(() => {
    if (redirect && posts.length === 0) {
      router.replace(redirect)
    }
  }, [router, redirect, posts])

  if (!posts) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.container}>
      <DocumentHead description={`Posts in ${category} before ${date}`} />
      <div className={styles.flexWraper}>
        <div className={styles.mainContent}>
          <header className={styles.mainTop}>
            <h2>{category}</h2>
          </header>
          <div className={styles.mainGallery}>
            <NoContents contents={posts} />

            {posts.map((post) => {
              return (
                <div className={styles.post} key={post.Slug}>
                  <PostDate post={post} />
                  <PostTitle post={post} />
                  <PostThumbnail post={post} />
                  <PostTags post={post} />
                  <PostExcerpt post={post} />
                </div>
              )
            })}
          </div>
          <footer>
            {/* <NextPageLinkCategory
              firstPost={firstPost}
              posts={posts}
              category={category}
            /> */}
            {!!firstPost &&
              posts.length > 0 &&
              firstPost.Date !== posts[posts.length - 1].Date && (
                <div className={stylesParts.nextContainer}>
                  <hr />
                  <div className={stylesParts.buttonSubContainer}>
                    <a
                      className={stylesParts.backButton}
                      onClick={() => router.back()}
                    >
                      {' '}
                      ＜ Back{' '}
                    </a>
                    <Link
                      href="/blog/before/[date]"
                      as={getBeforeLink(posts[posts.length - 1].Date)}
                      passHref
                    >
                      <a className={stylesParts.nextButton}>Next ＞</a>
                    </Link>
                  </div>
                </div>
              )}

            {!!firstPost &&
              posts.length > 0 &&
              firstPost.Date == posts[posts.length - 1].Date && (
                <div className={stylesParts.nextContainer}>
                  <hr />
                  <a
                    className={stylesParts.backButton}
                    onClick={() => router.back()}
                  >
                    ＜ Back
                  </a>
                </div>
              )}
          </footer>
        </div>

        <div className={styles.subContent}>
          <BlogCategoryLink heading="Category List" categorys={categorys} />
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <BlogPostLink heading="Latest Posts" posts={recentPosts} />
          <TwitterTimeline />
        </div>
      </div>
      <div className={styles.endContent}>
        <div className={styles.endSection}>
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
        </div>
        <div className={styles.endSection}>
          <BlogPostLink heading="Latest Posts" posts={recentPosts} />
        </div>
        <div className={styles.endSection}>
          <BlogCategoryLink heading="Tag List" categorys={categorys} />
          <TwitterTimeline />
        </div>
      </div>
    </div>
  )
}

export default RenderPostsByCategoryBeforeDate
