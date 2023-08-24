
import styles from './page.module.scss'
import Link from 'next/link'

export default function Home() {



  return (
    <div className={[styles.wrapper, 'indents'].join(' ')}>
      <p>Даная страница находится в разработке, перейдите на страницу&nbsp;<Link href='/catalog'>каталога</Link></p>
    </div>
  )
}
