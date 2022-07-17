import React, { useState } from 'react'
import axios from 'axios'

import styles from '../styles/like-button.module.css'
import Heart from './svgs/heart'

type Props = {
  id: string
  like: number
}

const LikeButton = (props: Props) => {
  const [count, setCount] = useState(props.like)
  const [active, setActive] = useState(false)

  const handleClick = () => {
    if (!active) {
      axios.put(`/api/like?slug=${props.id}`, {})
      setActive(true)
      setCount(count + 1)
    }
  }

  return (
    <button className={styles.likeButton} onClick={handleClick}>
      <p>へろちゃんへsubmit 🚀</p>
      <Heart width={32} height={32} active={active} />
      <div className={styles.likeCount}>{count} </div>
    </button>
  )
}

export default LikeButton
