import {
  NEXT_PUBLIC_URL,
  NEXT_PUBLIC_SITE_TITLE,
  NEXT_PUBLIC_SITE_DESCRIPTION,
} from '../lib/notion/server-constants'

const DocumentHead = ({
  title = '',
  description = '',
  path = '',
  urlOgImage = '',
}) => {
  const defaultImageURL = new URL('/hero-room.jpg', NEXT_PUBLIC_URL)
  return (
    <>
      <title>
        {title
          ? `${title} - ${NEXT_PUBLIC_SITE_TITLE}`
          : NEXT_PUBLIC_SITE_TITLE}
      </title>

      <meta
        name="description"
        content={description ? description : NEXT_PUBLIC_SITE_DESCRIPTION}
      />

      {/* ## 最新版コード */}
      {NEXT_PUBLIC_URL ? (
        <meta
          property="og:url"
          content={new URL(path, NEXT_PUBLIC_URL).toString()}
        />
      ) : null}
      <meta
        property="og:title"
        content={title ? title : NEXT_PUBLIC_SITE_TITLE}
      />
      <meta
        property="og:description"
        content={description ? description : NEXT_PUBLIC_SITE_DESCRIPTION}
      />
      <meta property="og:type" content="article" />

      {urlOgImage ? (
        <meta property="og:image" content={urlOgImage} />
      ) : NEXT_PUBLIC_URL ? (
        <meta property="og:image" content={defaultImageURL.toString()} />
      ) : null}

      <meta name="twitter:card" content="summary_large_image" />
      {urlOgImage ? (
        <meta name="twitter:image" content={urlOgImage} />
      ) : NEXT_PUBLIC_URL ? (
        <meta name="twitter:image" content={defaultImageURL.toString()} />
      ) : null}

      <meta name="twitter:site" content="@mineral_30" />
      {/* カード大小をしたかったらONにする
      <meta
        name="twitter:card"
        content={
          pathname === '/blog/[slug]' && urlOgImage
            ? 'summary_large_image'
            : 'summary'
        }
      /> */}

      {/* <link rel="canonical" href={currentURL.toString()} /> */}
      {NEXT_PUBLIC_URL ? (
        <link
          rel="canonical"
          href={new URL(path, NEXT_PUBLIC_URL).toString()}
        />
      ) : null}
    </>
  )
}

export default DocumentHead
