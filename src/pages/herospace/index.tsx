import DocumentHead from '../../components/document-head'
import Link from 'next/link'
import { BlogTagLink, TwitterTimeline } from '../../components/blog-parts'
import styles from '../../styles/blog.module.css'
import { getPosts, getFirstPost, getAllTags } from '../../lib/notion/client'
import { getEditTimeStr } from '../../lib/blog-helpers'
import SecStyles from '../../styles/sec-notion.module.css'
import { getAllSecShinyaPosts } from '../../lib/sec-notion/client'

export async function getStaticProps() {
  const posts = await getPosts()
  const firstPost = await getFirstPost()
  const tags = await getAllTags()
  const secPosts = await getAllSecShinyaPosts()

  return {
    props: {
      posts,
      firstPost,
      tags,
      secPosts
    },
    revalidate: 60,
  }
}

const RenderPostsSpace = ({
  //   posts = [],
  //   firstPost,

  tags = [],
  secPosts=[]
}) => {
  return (
    <div className={styles.container}>
      <DocumentHead title="Space" />
      <div className={styles.flexWraper}>
        <div className={styles.mainContent}>
          <h3>このページは作って遊ぶ場所＼(^o^)／</h3>
          <p>
            未完成だけどできたのが嬉しくて貼り付けて・・・
            <br />
            いろいろ好きなように使ってます〜
          </p>
          <div className={SecStyles.grid}>
        <h3>
          \ 深夜に学習を深める【深夜学習】開催中 /
        </h3>
        <p>
          24:00頃Twitterで課題に取り組む様子をつぶやきだします＼(^o^)／<br/>
          カードをクリックするとTwitterのスレッドへ飛ぶのでのぞいてみてね。
        </p>
        {secPosts.map(secPost => {
          return(
            <div className={SecStyles.card} key={secPost.title}>
            
            <h3>{secPost.date} ~</h3>
            <Link href={secPost.URL} passHref><p>📝 {secPost.title}</p></Link>
            <p>&#128537; {(secPost.description)?(secPost.description):null}</p>
            <hr/>
            <p>last edit : {getEditTimeStr(secPost.last_edit)}</p>
          </div>
          )
        })}
      </div>
          <iframe
            src="https://notion2charts.com/embed/bad01964-6bce-4f62-bc9d-1d2899652ed6"
            width="100%"
            height="300"
            // frameborder="0"
          ></iframe>
          <p>▼　Lofi動画をアップロードしてみた</p>

          <iframe
            src="https://www.youtube.com/embed/videoseries?list=PLUq06vyynuEUdRd1lu3ncpfTSjbogScmR"
            width="50%"
            height="300"
            // frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            // allowfullscreen
          ></iframe>
          <iframe
            src="https://dev.herohoro.com"
            width="100%"
            height="600"
            // frameborder="0"
          ></iframe>
        </div>

        <div className={styles.subContent}>
          <BlogTagLink heading="Tag List" tags={tags} />

          <TwitterTimeline />
        </div>
      </div>
    </div>
  )
}

export default RenderPostsSpace
