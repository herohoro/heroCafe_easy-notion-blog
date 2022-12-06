'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import styles from '../styles/blog-parts.module.css'

export const BackPageLink = ({ firstPost, posts }) => {
  const router = useRouter()
  if (!firstPost) return null
  if (posts.length === 0) return null

  const lastPost = posts[posts.length - 1]

  if (firstPost.Date !== lastPost.Date) return null

  return (
    <div className={styles.nextContainer}>
      <div className={styles.buttonSubContainer}>
        <a className={styles.backButton} onClick={() => router.back()}>
          {' '}
          ＜ Back{' '}
        </a>
      </div>
    </div>
  )
}
