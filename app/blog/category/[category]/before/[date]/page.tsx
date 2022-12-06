import { notFound } from 'next/navigation'
import { NUMBER_OF_POSTS_PER_PAGE } from '../../../../../../app/server-constants'
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
  PostThumbnail,
  PostLike,
  TwitterTimeline,
  NextBackPageLink,
  BackPageLink,
} from '../../../../../../components/blog-parts'
import {
  getPosts,
  getRankedPosts,
  getPostsByCategoryBefore,
  getFirstPostByCategory,
  getAllTags,
  getAllCategorys,
} from '../../../../../../lib/notion/client'
import styles from '../../../../../../styles/blog.module.css'

export const revalidate = 3600

const BlogCategoryBeforeDatePage = async ({
  params: { category: encodedCategory, date: encodedDate },
}) => {
  const category = decodeURIComponent(encodedCategory)
  const date = decodeURIComponent(encodedDate)

  if (!Date.parse(date) || !/^\d{4}-\d{2}-\d{2}/.test(date)) {
    notFound()
  }

  const [posts, firstPost, rankedPosts, recentPosts, tags, categorys] =
    await Promise.all([
      getPostsByCategoryBefore(category, date, NUMBER_OF_POSTS_PER_PAGE),
      getFirstPostByCategory(category),
      getRankedPosts(),
      getPosts(5),
      getAllTags(),
      getAllCategorys(),
    ])

  return (
    <div className={styles.container}>
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
            <NextBackPageLink
              firstPost={firstPost}
              posts={posts}
              category={category}
            />
            <BackPageLink firstPost={firstPost} posts={posts} />
          </footer>
        </div>

        <div className={styles.subContent}>
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
          <BlogCategoryLink heading="Tag List" categorys={categorys} />
          <TwitterTimeline />
        </div>
      </div>
    </div>
  )
}

export default BlogCategoryBeforeDatePage
