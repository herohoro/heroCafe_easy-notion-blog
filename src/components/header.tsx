import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { SITE_TITLE } from './document-head'
import styles from '../styles/header.module.css'

interface NavItem {
  label: string
  path: string
}

const Header = () => {
  const { asPath } = useRouter()

  const navItems: NavItem[] = [
    { label: 'Home', path: '/' },
    { label: 'Blog', path: '/blog' },
    { label: 'Space', path: '/herospace' },
  ]

  return (
    <header className={styles.header}>
      <h1>
        <Link href="/" passHref>
          <Image
            src="/herohoro_title.png"
            width={400}
            height={100}
            objectFit="contain"
            alt={SITE_TITLE}
          />
        </Link>
      </h1>

      <ul>
        {navItems.map(({ label, path }) => (
          <li key={label}>
            <Link href={path} passHref>
              <a className={asPath === path ? 'active' : null}>{label}</a>
            </Link>
          </li>
        ))}
      </ul>
    </header>
  )
}

export default Header
