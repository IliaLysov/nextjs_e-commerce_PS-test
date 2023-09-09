'use client'

import styles from './page.module.scss'
import { useEffect, useState } from 'react'

import { CatalogItems, PlantCatalogItemHorizon, PlantCatalogItemTile } from '@/components'
import { PlantInterface, PlantOwnerTypeEnum } from '@/types/product'
import { useAppDispatch, useAppSelector } from '../store'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { addToCart, addToCartPost, addToFavorites, addToFavoritesPost, cartItemsSelector, cartSelector, favoritesItemsSelector, favoritesSelector, getFavoritesItems, pendingSelector, removeFromCart, removeFromCartPost, removeFromFavorites, removeFromFavoritesPost, setProduct } from '@/modules'
import { CartDBItemInterface, CartItemInterface } from '@/types/cart'
import { FavoritesDBItemInterface, FavoritesItemInterface } from '@/types/favorites'

import SettingsSVG from '@/icons/Settings.svg'
import TileSVG from '@/icons/Tile.svg'
import HorizonSVG from '@/icons/Horizon.svg'

export default function Favorites() {
    const {data: session} = useSession()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [skip, setSkip] = useState<number>(0)

    const pending = useAppSelector(pendingSelector)

    const cart: CartDBItemInterface[] = useAppSelector(cartSelector)
    const favorites: FavoritesItemInterface[] = useAppSelector(favoritesSelector)
    
    const items: PlantInterface[] | null = useAppSelector(favoritesItemsSelector)

    useEffect(() => {
        if (favorites.length > 0 && !pending) {
            if (items) {
                const ids = favorites.map((obj: FavoritesDBItemInterface) => obj.productId)
                const isNotActual = favorites.map((obj: FavoritesDBItemInterface) => {
                    const boolArr = items.map((item: PlantInterface) => obj.productId === item._id)
                    return !boolArr.includes(true)
                })
                const refresh = isNotActual.includes(true) || favorites.length !== items.length
                refresh && console.log('get if items')
                refresh && dispatch(getFavoritesItems({skip, ids}))
            } else {
                console.log('get if not items')
                const ids = favorites.map((obj: FavoritesDBItemInterface) => obj.productId)
                dispatch(getFavoritesItems({skip, ids}))
            }
        }
    }, [favorites])

    const moveToProfile = (name: string) => {
        router.push(`/${name}`)
    }

    const handleCart = ({_id, }: any) => {
        const currentCartItem = cart.find(obj => obj.productId === _id)       
        if (session) {
            if (currentCartItem) {
                dispatch(removeFromCartPost(currentCartItem))
            } else {
                dispatch(addToCartPost({productId: _id, count: 1}))
            }
        } else {
            if (currentCartItem) {
                dispatch(removeFromCart(currentCartItem.productId))
            } else {
                dispatch(addToCart({productId: _id, count: 1}))
            }
        }
    }

    const handleFavorites = ({_id, }: any) => {
        
        const currentFavoritesItem = favorites.find(obj => obj.productId === _id)       
        if (session) {
            if (currentFavoritesItem) {
                dispatch(removeFromFavoritesPost(currentFavoritesItem))
            } else {
                dispatch(addToFavoritesPost(_id))
            }
        } else {
            if (currentFavoritesItem) {
                dispatch(removeFromFavorites(currentFavoritesItem.productId))
            } else {
                dispatch(addToFavorites({productId: _id}))
            }
        }
    }

    const linkTo = (item: any) => {
        dispatch(setProduct(item))
        const {name, _id} = item 
        const link = name.toLocaleLowerCase().split(' ').join('-') + `-${_id}`
        router.push(`/catalog/${link}`)
    }

    const [horizon, setHorizon] = useState(true)

    return (
        <div className={[styles.wrapper, 'indents'].join(' ')}>
            <div className={styles.top}>
                <div className={styles.topBtn}>
                    <div className={styles.topBtnName}>Сортировать по</div>
                    <SettingsSVG className={styles.topBtnIcon}/>
                </div>
                <div className={[styles.tileSwitch, horizon && styles.active].join(' ')}>
                    <div className={styles.tile} onClick={() => setHorizon(true)}>
                        <HorizonSVG className={[styles.tileSwitchIcon, styles.left].join(' ')}/>
                    </div>
                    <div className={styles.tile} onClick={() => setHorizon(false)}>
                        <TileSVG className={[styles.tileSwitchIcon, styles.right].join(' ')}/>
                    </div>
                </div>
            </div>
            <div className={[styles.items, horizon && styles.horizon].join(' ')}>{
                items?.map((item: PlantInterface, idx) => {
                    const cartExistance = cart.some((obj: CartItemInterface) => obj.productId === item._id)
                    const favoriteExistance = favorites.some((obj: FavoritesItemInterface) => obj.productId === item._id)
                    return (
                        <li key={idx}>
                            {
                                horizon
                                ?
                                <PlantCatalogItemHorizon item={item} profile={moveToProfile} handleCart={handleCart} inCart={cartExistance} handleFavorite={handleFavorites} inFavorite={favoriteExistance} linkTo={linkTo}/>
                                :
                                <PlantCatalogItemTile item={item} profile={moveToProfile} handleCart={handleCart} inCart={cartExistance} handleFavorite={handleFavorites} inFavorite={favoriteExistance} linkTo={linkTo}/>
                            }
                        </li>
                    )
                })
            }</div>
            {/* {items && items.length === skip && <button className={styles.moreBtn} onClick={() => showMore()}>Загрузить еще</button>} */}
        </div>
    )
}