'use client'

import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

import LogoSVG from '@/icons/Logo.svg'
import CatalogSVG from '@/icons/Catalog.svg'
import SearchSVG from '@/icons/Search.svg'
import FavoritesSVG from '@/icons/Like.svg'
import CartSVG from '@/icons/Cart.svg'
import UserSVG from '@/icons/User.svg'
import Search from '@/icons/Search.svg'

import { usePathname } from 'next/navigation'

import {useSession} from 'next-auth/react'
import { useState, useRef, useEffect } from 'react'

import userImg from '@/images/user-default.png'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { cartSelector, favoritesSelector, setCart, setFavorites } from '@/modules'


export default function Header() {
    const dispatch = useAppDispatch()
    const {data: session} = useSession()
    console.log(session)
    
    const cart = useAppSelector(cartSelector)
    const favorites = useAppSelector(favoritesSelector)
    
    const pathname = usePathname()
    
    const [menu, setMenu] = useState(false)
    
    const menuRef = useRef<HTMLDivElement>(null)
    const userRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (session) {
            session.cart && dispatch(setCart(session.cart))
            session.favorites && dispatch(setFavorites(session.favorites))
        }
    }, [session])

    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (!menuRef.current?.contains(event.target as Node) && !userRef.current?.contains(event.target as Node)) {
                setMenu(false)
            }}
        document.addEventListener('mousedown', handleOutsideClick)
        return () => {document.removeEventListener('mousedown', handleOutsideClick)}
    }, [])


    return (
        <>
            <header className={[styles.wrapper, styles.top].join(' ')}>
                <div className={styles.side}>
                    <Link href='/' className={styles.logo}>
                        <LogoSVG className={styles.logoIcon}/>
                    </Link>
                    <input className={styles.search} type='text' id='name' placeholder='Поиск растений и питомников'/>
                </div>
                <div className={styles.side}>
                    <Link href='/catalog' className={[styles.navLink, pathname.endsWith('catalog') && styles.active].join(' ')}>
                        <CatalogSVG className={styles.navIcon} />
                        <div className={styles.navTitle}>Каталог</div>
                    </Link>
                    <Link href='/favorites' className={[styles.navLink, pathname.endsWith('favorites') && styles.active].join(' ')}>
                        <FavoritesSVG className={styles.navIcon} />
                        <div className={styles.navTitle}>Избранные</div>
                        <div className={[styles.notification, favorites.length > 0 && styles.active].join(' ')}>{favorites.length}</div>
                    </Link>
                    <Link href='/cart' className={[styles.navLink, pathname.endsWith('cart') && styles.active].join(' ')}>
                        <CartSVG className={styles.navIcon} />
                        <div className={styles.navTitle}>Корзина</div>
                        <div className={[styles.notification, cart.length > 0 && styles.active].join(' ')}>{cart.length}</div>
                    </Link>
                    <div className={styles.user} onClick={() => setMenu(prev => !prev)} ref={userRef} >
                        {session ?
                            session.user.image ?
                            <img src={session.user.image} alt="avatar" className={[styles.avatar, styles.img].join(' ')}/>
                            :
                            <div className={[styles.avatar, styles.text].join(' ')}>{session?.user.email.charAt(0)}</div>
                            :
                            <Image src={userImg} alt="user" height='30' width='30' priority={true} loading='eager' className={[styles.avatar, styles.img].join(' ')}/>
                        }
                        {(session?.user.name || session?.user.email) && <div className={styles.userName}>{session.user.name || session.user.email}</div>}
                        <div className={[styles.menu, menu && styles.active].join(' ')} ref={menuRef}>
                            {session ?
                                <>
                                    <Link href='/account' className={styles.menuItem}>Аккаунт</Link>
                                    <Link href='/api/auth/signout' className={styles.menuItem}>Выйти</Link>
                                </>
                                :
                                <Link href='/api/auth/signin' className={styles.menuItem}>Войти</Link>
                            }
                        </div>
                    </div>
                </div>
            </header>
            <header className={[styles.wrapper, styles.bottom].join(' ')}>
                <Link href='/catalog' className={[styles.navLink, pathname.endsWith('catalog') && styles.active].join(' ')}>
                    <SearchSVG className={styles.navIcon} />
                    <div className={styles.navTitle}>Каталог</div>
                </Link>
                
                <Link href='/cart' className={[styles.navLink, pathname.endsWith('cart') && styles.active].join(' ')}>
                    <CartSVG className={styles.navIcon} />
                    <div className={styles.navTitle}>Корзина</div>
                    <div className={[styles.notification, cart.length > 0 && styles.active].join(' ')}>{cart.length}</div>
                </Link>
                <Link href='/' className={[styles.logo, pathname.endsWith('/') && styles.active].join(' ')}>
                    <LogoSVG className={styles.logoIcon}/>
                </Link>
                <Link href='/favorites' className={[styles.navLink, pathname.endsWith('favorites') && styles.active].join(' ')}>
                    <FavoritesSVG className={styles.navIcon} />
                    <div className={styles.navTitle}>Избранные</div>
                    <div className={[styles.notification, favorites.length > 0 && styles.active].join(' ')}>{favorites.length}</div>
                </Link>
                <Link href='/account' className={[styles.navLink, pathname.endsWith('account') && styles.active].join(' ')}>
                    <UserSVG className={styles.navIcon} />
                    <div className={styles.navTitle}>Профиль</div>
                </Link>
            </header>
        </>
    )
}