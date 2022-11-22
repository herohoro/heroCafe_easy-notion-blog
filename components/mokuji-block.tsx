import React from 'react'
// import dynamic from 'next/dynamic'
import * as interfaces from '../lib/notion/interfaces'

import styles from '../styles/notion-block.module.css'
// https://github.com/otoyo/easy-notion-blog/pull/98
// このPRでdynamicで取り込むとMokujiblockのheading*の引数blockがエラーになることからdynamic中止

const RichText = ({ richText }) => {
  let element = richText.Text.Content

  if (richText.Href) {
    element = <a href={richText.Href}>{element}</a>
  }

  return element
}

const colorClass = (color: string) => {
  switch (color) {
    case 'gray':
      return styles.gray
    case 'brown':
      return styles.brown
    case 'orange':
      return styles.orange
    case 'yellow':
      return styles.yellow
    case 'green':
      return styles.green
    case 'blue':
      return styles.blue
    case 'purple':
      return styles.purple
    case 'pink':
      return styles.pink
    case 'red':
      return styles.red
    case 'gray_background':
      return styles.grayBackground
    case 'brown_background':
      return styles.brownBackground
    case 'orange_background':
      return styles.orangeBackground
    case 'yellow_background':
      return styles.yellowBackground
    case 'green_background':
      return styles.greenBackground
    case 'blue_background':
      return styles.blueBackground
    case 'purple_background':
      return styles.purpleBackground
    case 'pink_background':
      return styles.pinkBackground
    case 'red_background':
      return styles.redBackground
  }
  return null
}

// const Heading1 = dynamic(() => import('./notion-block'))
// const Heading2 = dynamic(() => import('./notion-block'))
// const Heading3 = dynamic(() => import('./notion-block'))

const Heading1 = ({ block }) => <Heading heading={block.Heading1} level={1} />
const Heading2 = ({ block }) => <Heading heading={block.Heading2} level={2} />
const Heading3 = ({ block }) => <Heading heading={block.Heading3} level={3} />

const Heading = ({ heading, level = 1 }) => {
  const tag = `h${level + 3}`
  const id = heading.RichTexts.map(
    (richText: interfaces.RichText) => richText.Text.Content
  )
    .join()
    .trim()
  const htag = React.createElement(
    tag,
    { className: colorClass(heading.Color) },
    heading.RichTexts.map((richText: interfaces.RichText) => (
      <RichText richText={richText} key={id} />
    ))
  )

  return (
    <a href={`#${id}`} id={id}>
      {htag}
    </a>
  )
}

const MokujiBlock = ({ block }) => {
  if (block.Type === 'heading_1') {
    return <Heading1 block={block} />
  } else if (block.Type === 'heading_2') {
    return <Heading2 block={block} />
  } else if (block.Type === 'heading_3') {
    return <Heading3 block={block} />
  }
  return null
}

const MokujiBlocks = ({ blocks }) => (
  <>
    {wrapListItems(blocks).map((block: interfaces.Block, i: number) => (
      <MokujiBlock block={block} key={`block-${i}`} />
    ))}
  </>
)

const wrapListItems = (blocks: Array<interfaces.Block>) =>
  blocks.reduce((arr, block: interfaces.Block, i: number) => {
    const isBulletedListItem = block.Type === 'bulleted_list_item'
    const isNumberedListItem = block.Type === 'numbered_list_item'

    if (!isBulletedListItem && !isNumberedListItem) return arr.concat(block)

    const listType = isBulletedListItem ? 'bulleted_list' : 'numbered_list'

    if (i === 0) {
      const list: interfaces.List = {
        Type: listType,
        ListItems: [block],
      }
      return arr.concat(list)
    }

    const prevList = arr[arr.length - 1]

    if (
      (isBulletedListItem && prevList.Type !== 'bulleted_list') ||
      (isNumberedListItem && prevList.Type !== 'numbered_list')
    ) {
      const list: interfaces.List = {
        Type: listType,
        ListItems: [block],
      }
      return arr.concat(list)
    }

    prevList.ListItems.push(block)

    return arr
  }, [])

export default MokujiBlocks
