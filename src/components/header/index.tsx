'use client'

import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

import Logo from '@/icons/Logo.svg'
import Catalog from '@/icons/Catalog.svg'
import Favorites from '@/icons/Like.svg'
import Cart from '@/icons/Cart.svg'

import { usePathname } from 'next/navigation'

import {useSession} from 'next-auth/react'


export default function Header() {
    const {data: session} = useSession()

    console.log(session)
    
    const cart = []
    const favorites = []


    const pathname = usePathname()


    return (
        <header className={styles.wrapper}>
            <div className={styles.side}>
                <Link href='/' className={styles.logo}>
                    <Image priority src={Logo} alt='PlantStore' className={styles.logoIcon} blurDataURL={'/src/icons/blur/Logo.png'}/>
                </Link>
                <input className={styles.search} type='text' id='name' placeholder='Поиск растений и питомников'/>
            </div>
            <div className={styles.side}>
                <Link href='/catalog' className={[styles.navLink, pathname.endsWith('catalog') && styles.active].join(' ')}>
                    <Image priority src={Catalog} alt='Каталог' className={styles.navIcon} blurDataURL={'/src/icons/blur/Catalog.png'}/>
                    <div className={styles.navTitle}>Каталог</div>
                </Link>
                <Link href='/favorites' className={[styles.navLink, pathname.endsWith('favorites') && styles.active].join(' ')}>
                    <Image priority src={Favorites} alt='Избранные' className={styles.navIcon} blurDataURL={'/src/icons/blur/Favorites.png'}/>
                    <div className={styles.navTitle}>Избранные</div>
                    <div className={[styles.notification, favorites.length > 0 && styles.active].join(' ')}>{favorites.length}</div>
                </Link>
                <Link href='/cart' className={[styles.navLink, pathname.endsWith('cart') && styles.active].join(' ')}>
                    <Image priority src={Cart} alt='Корзина' className={styles.navIcon} blurDataURL={'/src/icons/blur/Cart.png'}/>
                    <div className={styles.navTitle}>Корзина</div>
                    <div className={[styles.notification, cart.length > 0 && styles.active].join(' ')}>{cart.length}</div>
                </Link>
                <div className={styles.user}>
                    <Link href='/api/auth/signin' className={styles.auth}>Войти</Link>
                    <Link href='/api/auth/signout' className={styles.auth}>Выйти</Link>
                </div>
            </div>
        </header>
    )
}