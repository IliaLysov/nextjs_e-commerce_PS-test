'use client'

import styles from './styles.module.scss'
import Link from 'next/link'
import Image from 'next/image'

import LogoSVG from '@/icons/Logo.svg'
import LogoFSVG from '@/icons/LogoF.svg'
import CatalogSVG from '@/icons/Catalog.svg'
import SearchSVG from '@/icons/Search.svg'
import FavoritesSVG from '@/icons/Like.svg'
import CartSVG from '@/icons/Cart.svg'
import UserSVG from '@/icons/User.svg'
import Search from '@/icons/Search.svg'

import { usePathname } from 'next/navigation'

import {useSession} from 'next-auth/react'
import { useState, useRef, useEffect } from 'react'

import { useAppDispatch, useAppSelector } from '@/app/store'
import { cartSelector, favoritesSelector, pendingSelector, setCart, setFavorites, setPending } from '@/modules'


export default function Header() {
    const dispatch = useAppDispatch()
    const {data: session} = useSession()
    
    const cart = useAppSelector(cartSelector)
    const favorites = useAppSelector(favoritesSelector)
    const pending = useAppSelector(pendingSelector)
    
    const pathname = usePathname()
    
    const [menu, setMenu] = useState(false)
    
    const menuRef = useRef<HTMLDivElement>(null)
    const userRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        dispatch(setPending(false))
    }, [session])
    
    useEffect(() => {
        if (!pending) {
            if (session) {
                session.cart && dispatch(setCart(session.cart))
                session.favorites && dispatch(setFavorites(session.favorites))
            } else {
                const cart = localStorage.getItem('localCart')
                if (cart) {
                    dispatch(setCart(JSON.parse(cart)))
                }
                const favorites = localStorage.getItem('localFavorites')
                if (favorites) {
                    dispatch(setFavorites(JSON.parse(favorites)))
                }
            }
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
                    <Link href='/' className={[styles.logo, pathname.endsWith('/') && styles.active].join(' ')}>
                        <LogoFSVG className={styles.logoIcon}/>
                    </Link>
                    <input className={styles.search} type='text' id='name' placeholder='Поиск растений и питомников'/>
                </div>
                <div className={styles.side}>
                    <Link href='/catalog' className={[styles.navLink, pathname.includes('catalog') && styles.active].join(' ')}>
                        <CatalogSVG className={styles.navIcon} />
                        <div className={styles.navTitle}>Каталог</div>
                    </Link>
                    <Link href='/favorites' className={[styles.navLink, pathname.includes('favorites') && styles.active].join(' ')}>
                        <FavoritesSVG className={styles.navIcon} />
                        <div className={styles.navTitle}>Любимые</div>
                        <div className={[styles.notification, favorites.length > 0 && styles.active].join(' ')}>{favorites.length}</div>
                    </Link>
                    <Link href='/cart' className={[styles.navLink, pathname.includes('cart') && styles.active].join(' ')}>
                        <CartSVG className={styles.navIcon} />
                        <div className={styles.navTitle}>Корзина</div>
                        <div className={[styles.notification, cart.length > 0 && styles.active].join(' ')}>{cart.length}</div>
                    </Link>
                    <div className={[styles.navLink, session?.user.image && styles.userLink, pathname.endsWith('account') && styles.active].join(' ')} onClick={() => setMenu(prev => !prev)} ref={userRef} >
                        {session ?
                            session.user.image ?
                            <img src={session.user.image} alt="avatar" className={[styles.navIcon, styles.user].join(' ')}/>
                            :
                            <UserSVG className={styles.navIcon} />
                            :
                            <UserSVG className={styles.navIcon} />
                        }
                        <div className={styles.navTitle}>{session?.user.name || session?.user.email || 'Войти'}</div>
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
                    <LogoFSVG className={styles.logoIcon}/>
                </Link>
                <Link href='/favorites' className={[styles.navLink, pathname.endsWith('favorites') && styles.active].join(' ')}>
                    <FavoritesSVG className={styles.navIcon} />
                    <div className={styles.navTitle}>Любимые</div>
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