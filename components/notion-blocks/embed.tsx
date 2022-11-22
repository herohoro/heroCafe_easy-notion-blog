import TweetEmbed from './tweet-embed'
import Bookmark from './bookmark'

const Embed = ({ block }) => {
  if (
    /^https:\/\/twitter\.com/.test(block.Embed.Url) ||
    /^https:\/\/mobile\.twitter\.com/.test(block.Embed.Url)
  ) {
    return <TweetEmbed url={block.Embed.Url} />
  } else if (/^https:\/\/gist\.github\.com/.test(block.Embed.Url)) {
    return <Bookmark block={block} />
  }

  return (
    <>
      <code> embedがうまく動かない状態です😵 後日復旧させます〜 </code>
      <p>表示させたかったembed &#x2b07; </p>
      <a href={block.Embed.Url}>{block.Embed.Url}</a>
    </>
  )
}

export default Embed
