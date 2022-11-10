import React from 'react'
import useSWR from 'swr'
import axios from 'axios'

import { NEXT_PUBLIC_URL } from '../../lib/notion/server-constants'
import { Post } from '../../lib/notion/interfaces'
import DocumentHead from '../../components/document-head'
import { Block } from '../../lib/notion/interfaces'
import {
  BlogPostLink,
  BlogTagLink,
  BlogCategoryLink,
  NoContents,
  PostBody,
  PostDate,
  PostEditTimeStr,
  PostTitleSlug,
  PostTagsSlug,
  PostCategorySlug,
  // PostThumbnailSlug,
  PostsNotFound,
  TwitterTimeline,
  ClosePhrase,
  IndexList,
  NewPostList,
  RssFeed,
} from '../../components/blog-parts'
import SocialButtons from '../../components/social-buttons'
import styles from '../../styles/blog.module.css'
import { getBlogLink } from '../../lib/blog-helpers'
import {
  getPosts,
  getAllPosts,
  getRankedPosts,
  getPostBySlug,
  getPostsByTag,
  getAllTags,
  getAllCategorys,
  getAllBlocksByBlockId,
} from '../../lib/notion/client'

export async function getStaticProps({ params: { slug } }) {
  const post = await getPostBySlug(slug)

  if (!post) {
    console.log(`Failed to find post for slug: ${slug}`)
    return {
      props: {
        redirect: '/blog',
      },
      revalidate: 30,
    }
  }

  const [blocks, rankedPosts, recentPosts, tags, sameTagPosts, categorys] =
    await Promise.all([
      getAllBlocksByBlockId(post.PageId),
      getRankedPosts(),
      getPosts(5),
      getAllTags(),
      getPostsByTag(post.Tags[0], 6),
      getAllCategorys(),
    ])

  const fallback = {}
  fallback[slug] = blocks

  return {
    props: {
      slug,
      post,
      rankedPosts,
      recentPosts,
      tags,
      sameTagPosts: sameTagPosts.filter((p: Post) => p.Slug !== post.Slug),
      fallback,
      categorys,
    },
    revalidate: 60,
  }
}

export async function getStaticPaths() {
  const posts = await getAllPosts()
  return {
    paths: posts.map((post) => getBlogLink(post.Slug)),
    fallback: 'blocking',
  }
}

const fetchBlocks = async (slug: string): Promise<Array<Block>> => {
  try {
    const { data: blocks } = await axios.get(`/api/blocks?slug=${slug}`)
    return blocks as Array<Block>
  } catch (error) {
    console.log(error)
  }
}

const includeExpiredImage = (blocks: Array<Block>): boolean => {
  const now = Date.now()

  return blocks.some((block) => {
    if (block.Type === 'image') {
      const image = block.Image
      if (
        image.File &&
        image.File.ExpiryTime &&
        Date.parse(image.File.ExpiryTime) < now
      ) {
        return true
      }
    }
    // TODO: looking for the image block in Children recursively
    return false
  })
}

const RenderPost = ({
  slug,
  post,
  rankedPosts = [],
  recentPosts = [],
  sameTagPosts = [],
  tags = [],
  fallback,
  categorys = [],
}) => {
  const { data: blocks, error } = useSWR(
    includeExpiredImage(fallback[slug]) && slug,
    fetchBlocks,
    { fallbackData: fallback[slug] }
  )

  if (error || !blocks) {
    return <PostsNotFound />
  }

  return (
    <div className={styles.container}>
      <DocumentHead
        title={post.Title}
        description={post.Excerpt}
        urlOgImage={
          NEXT_PUBLIC_URL &&
          new URL(`/api/og-image/${post.Slug}`, NEXT_PUBLIC_URL).toString()
        }
      />
      <div className={styles.flexWraper}>
        <div className={styles.mainContent}>
          <div className={styles.postSlug}>
            <div>
              <PostDate post={post} />
              <PostCategorySlug post={post} />
            </div>

            <PostTitleSlug post={post} enableLink={false} />
            {/* <PostThumbnailSlug post={post} /> */}
            <PostTagsSlug post={post} />
            <br />
            <hr />
            <PostEditTimeStr post={post} />

            <NoContents contents={blocks} />
            <PostBody blocks={blocks} />
            <ClosePhrase />

            <footer>
              {NEXT_PUBLIC_URL && (
                <SocialButtons
                  title={post.Title}
                  url={new URL(
                    getBlogLink(post.Slug),
                    NEXT_PUBLIC_URL
                  ).toString()}
                  id={post.Slug}
                  like={post.Like}
                />
              )}
            </footer>
            <p>
              ▼　この記事に興味があったら同じタグから関連記事をのぞいてみてね
            </p>
            <PostTagsSlug post={post} />
          </div>
        </div>

        <div className={styles.subContent}>
          <RssFeed />
          <BlogCategoryLink heading="Category List" categorys={categorys} />
          <BlogPostLink
            heading="Posts in the same tag"
            posts={sameTagPosts}
            enableThumnail={true}
          />
          <BlogTagLink heading="Tag List" tags={tags} />
          <BlogPostLink
            heading="Recommended"
            posts={rankedPosts}
            enableThumnail={true}
          />
          <BlogPostLink
            heading="Latest posts"
            posts={recentPosts}
            enableThumnail={true}
          />
          <TwitterTimeline />
          <IndexList heading="★ MOKUJI ★" blocks={blocks} />
        </div>
      </div>
      <div className={styles.endContent}>
        <div className={styles.endSection}>
          <BlogPostLink
            heading="Posts in the same tag"
            posts={sameTagPosts}
            enableThumnail={true}
          />
          <PostTagsSlug post={post} />
        </div>
        <div className={styles.endSection}>
          <BlogPostLink
            heading="Latest posts"
            posts={recentPosts}
            enableThumnail={true}
          />
          <div className={styles.inlineCenter}>
            <BlogCategoryLink heading="Category List" categorys={categorys} />
            <NewPostList />
          </div>
        </div>
        <div className={styles.endSection}>
          <BlogTagLink heading="Tag List" tags={tags} />
          <TwitterTimeline />
        </div>
      </div>
    </div>
  )
}

export default RenderPost
