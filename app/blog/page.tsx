import { NUMBER_OF_POSTS_PER_PAGE } from '../../app/server-constants'
import GoogleAnalytics from '../../components/google-analytics'
import {
  BlogPostLink,
  BlogTagLink,
  BlogCategoryLink,
  NextPageLink,
  NoContents,
  PostDate,
  PostExcerpt,
  PostTags,
  PostCategory,
  PostTitle,
  PostThumbnail,
  PostLike,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
  getAllCategorys,
  getAllBlocksByBlockId,
} from '../../lib/notion/client'
import { PROFILE_PAGE_ID } from '../../app/server-constants'
import NotionBlocks from '../../components/notion-block'

export const revalidate = 60

const BlogPage = async () => {
  const [profileblocks, posts, firstPost, rankedPosts, tags, categorys] =
    await Promise.all([
      getAllBlocksByBlockId(PROFILE_PAGE_ID),
      getPosts(NUMBER_OF_POSTS_PER_PAGE),
      getFirstPost(),
      getRankedPosts(),
      getAllTags(),
      getAllCategorys(),
    ])

  return (
    <>
      <GoogleAnalytics pageTitle="Blog" />
      <div className={styles.container}>
        <div className={styles.flexWraper}>
          <div className={styles.mainContent}>
            <NoContents contents={posts} />
            <div className={styles.mainGallery}>
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
              <NextPageLink firstPost={firstPost} posts={posts} />
            </footer>
          </div>

          <div className={styles.subContent}>
            <div>
              <h3>Prolile</h3>
              <hr />
              <NotionBlocks blocks={profileblocks} />
            </div>
            <BlogCategoryLink heading="Category List" categorys={categorys} />
            <BlogTagLink heading="Tag List" tags={tags} />
            <BlogPostLink heading="Recommended" posts={rankedPosts} />
          </div>
        </div>

        <div className={styles.endContent}>
          <div className={styles.endSection}>
            <BlogPostLink heading="Recommended" posts={rankedPosts} />
          </div>
          <div className={styles.endSection}>
            <BlogCategoryLink heading="Category List" categorys={categorys} />
          </div>
          <div className={styles.endSection}>
            <BlogTagLink heading="Tag List" tags={tags} />
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPage
