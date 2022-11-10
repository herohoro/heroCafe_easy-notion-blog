import DocumentHead from '../../components/document-head'
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
  TwitterTimeline,
  RssFeed,
} from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import {
  getPosts,
  getFirstPost,
  getRankedPosts,
  getAllTags,
  getAllCategorys,
} from '../../lib/notion/client'
import * as imageCache from '../../lib/notion/image-cache'
import Image from 'next/image'

export async function getStaticProps() {
  const [posts, firstPost, rankedPosts, tags, categorys] = await Promise.all([
    getPosts(),
    getFirstPost(),
    getRankedPosts(),
    getAllTags(),
    getAllCategorys(),
  ])
  posts.forEach((p) => p.OGImage && imageCache.store(p.PageId, p.OGImage))
  return {
    props: {
      posts,
      firstPost,
      rankedPosts,
      tags,
      categorys,
    },
    revalidate: 60,
  }
}
const RenderPosts = ({
  posts = [],
  firstPost,
  rankedPosts = [],
  tags = [],
  categorys = [],
}) => {
  return (
    <div className={styles.container}>
      <DocumentHead title="Blog" />
      <div className={styles.flexWraper}>
        <div className={styles.mainContent}>
          {/* <IndexBlogTagLink heading="Tags" tags={tags} /> */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Image
              src="/study-hero.jpeg"
              width={300}
              height={200}
              objectFit="contain"
              alt=""
            />
          </div>
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
          <RssFeed />
          <BlogCategoryLink heading="Category List" categorys={categorys} />
          <BlogTagLink heading="Tag List" tags={tags} />
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
          <TwitterTimeline />
        </div>
      </div>
      <div className={styles.endContent}>
        <div className={styles.endSection}>
          <BlogPostLink heading="Recommended" posts={rankedPosts} />
        </div>
        <div className={styles.endSection}>
          <BlogCategoryLink heading="Category List" categorys={categorys} />
          <TwitterTimeline />
        </div>
        <div className={styles.endSection}>
          <BlogTagLink heading="Tag List" tags={tags} />
        </div>
      </div>
    </div>
  )
}

export default RenderPosts
