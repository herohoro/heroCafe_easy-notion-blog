import { render } from '@testing-library/react'
import RenderPage from '../../src/pages/index'
import { getAllBlocksByBlockId } from '../../src/lib/notion/client'
import { INDEX_PAGE_ID } from '../../src/lib/notion/server-constants'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
      pathname: '/',
    }
  },
}))

describe('RenderPage', () => {
  it('renders the page unchanged', async () => {
    const blocks = await getAllBlocksByBlockId(INDEX_PAGE_ID)
    const { container } = render(<RenderPage blocks={blocks} />)
    expect(container).toMatchSnapshot()
  })
})
