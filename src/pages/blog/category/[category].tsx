import { useRouter } from 'next/router'

import { NUMBER_OF_POSTS_PER_PAGE } from '../../../lib/notion/server-constants'
import DocumentHead from '../../../components/document-head'
import {
  BlogPostLink,
  BlogTagLink,
  BlogCategoryLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostCategory,
  PostTitle,
  PostsNotFound,
  PostThumbnail,
  PostLike,
  TwitterTimeline,
  RssFeed,
  // NextPageLinkCategory,
  NextPageLink,
} from '../../../components/blog-parts'
import styles from '../../../styles/blog.module.css'
import { getCategoryLink } from '../../../lib/blog-helpers'
import { useEffect } from 'react'
import {
  getPosts,
  getRankedPosts,
  getPostsByCategory,
  getFirstPostByCategory,
  getAllTags,
  getAllCategorys,
} from '../../../lib/notion/client'

export async function getStaticProps({ params: { category } }) {
  const posts = await getPostsByCategory(category, NUMBER_OF_POSTS_PER_PAGE)

  const [firstPost, rankedPosts, recentPosts, tags, categorys] =
    await Promise.all([
      getFirstPostByCategory(category),
      getRankedPosts(),
      getPosts(5),
      getAllTags(),
      getAllCategorys(),
    ])

  if (posts.length === 0) {
    console.log(`Failed to find posts for category: ${category}`)
    return {
      props: {
        redirect: '/blog',
      },
      revalidate: 30,
    }
  }

  return {
    props: {
      posts,
      firstPost,
      rankedPosts,
      recentPosts,
      tags,
      categorys,
      category,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const category = await getAllCategorys()

  console.log(category)

  return {
    paths: category.map((category) => getCategoryLink(category)),
    fallback: 'blocking',
  }
}

const RenderPostsByCategorys = ({
  category,
  posts = [],
  firstPost,
  rankedPosts = [],
  recentPosts = [],
  tags = [],
  categorys = [],
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
      <DocumentHead description={`Posts in ${category}`} />
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
                  <div className={styles.twoColums}>
                    <PostDate post={post} />
                    <PostLike post={post} />
                  </div>
                  <PostCategory post={post} />
                  <PostTitle post={post} />
                  <PostThumbnail post={post} />
                  <PostTags post={post} />
                  <PostExcerpt post={post} />
                </div>
              )
            })}
          </div>
          <footer>
            <NextPageLink
              firstPost={firstPost}
              posts={posts}
              category={category}
            />

            {/* {!!firstPost &&
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
              )} */}
          </footer>
        </div>

        <div className={styles.subContent}>
          <RssFeed />
          <BlogCategoryLink heading="Category List" categorys={categorys} />
          <BlogTagLink heading="Tag List" tags={tags} />
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
          <BlogCategoryLink heading="Category List" categorys={categorys} />
          <TwitterTimeline />
        </div>
      </div>
    </div>
  )
}

export default RenderPostsByCategorys
