import DocumentHead from '../../../../../../components/document-head'

const BlogCategoryBeforeDateHead = async ({
  params: { category: encodedCategory, date: encodedDate },
}) => {
  const category = decodeURIComponent(encodedCategory)
  const date = decodeURIComponent(encodedDate)

  return (
    <DocumentHead
      description={`Posts in ${category} before ${date.split('T')[0]}`}
    />
  )
}

export default BlogCategoryBeforeDateHead
