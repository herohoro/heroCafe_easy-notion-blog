import DocumentHead from '../../../../components/document-head'

const BlogCategoryHead = async ({ params: { tag: encodedCategory } }) => {
  const category = decodeURIComponent(encodedCategory)

  return <DocumentHead description={`Posts in ${category}`} />
}

export default BlogCategoryHead
