'use client'

import styles from './page.module.scss'
import { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { addToCart, addToCartPost, addToFavorites, addToFavoritesPost, cartItemsSelector, cartSelector, deleteProduct, favoritesSelector, getCartItems, pendingSelector, removeFromCart, removeFromCartPost, removeFromFavorites, removeFromFavoritesPost, setModal, setProduct } from '@/modules'
import { PlantInterface, PlantOwnerTypeEnum } from '@/types/product'
import { CartDBItemInterface, CartInfoInterface, CartItemInterface } from '@/types/cart'
import { PlantCartItem } from '@/components'
import { FavoritesItemInterface } from '@/types/favorites'

export default function Cart() {
    const {data: session} = useSession()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [skip, setSkip] = useState<number>(0)
    const [price, setPrice] = useState<number>()

    const pending = useAppSelector(pendingSelector)

    const cart: CartDBItemInterface[] = useAppSelector(cartSelector)
    const favorites: FavoritesItemInterface[] = useAppSelector(favoritesSelector)
    
    const items: PlantInterface[] | null = useAppSelector(cartItemsSelector)
    
    useEffect(() => {
        if (cart.length > 0 && !pending) {
            if (items) {
                const ids = cart.map((obj: CartDBItemInterface) => obj.productId)
                const isNotActual = cart.map((obj: CartDBItemInterface) => {
                    const boolArr = items.map((item: PlantInterface) => obj.productId === item._id)
                    return !boolArr.includes(true)
                })
                const refresh = isNotActual.includes(true) || cart.length !== items.length
                refresh && console.log('get if items')
                refresh && dispatch(getCartItems({skip, ids}))
            } else {
                console.log('get if not items')
                const ids = cart.map((obj: CartDBItemInterface) => obj.productId)
                dispatch(getCartItems({skip, ids}))
            }
        }
    }, [cart])

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

    const order = (style: string) => (
        <div className={[styles.orderWrapper, style].join(' ')}>
            <div className={styles.order}>
                <h1 className={styles.orderTitle}>Ваша корзина</h1>
                <div className={styles.orderContent}>
                    {/* <div className={styles.count}>{`Количество товаров • ${cartInfo?.count}`}</div>
                    <div className={styles.price}>{`${cartInfo?.price} ₽`}</div> */}
                </div>
                <button className={styles.orderBtn}>Перейти к оформлению</button>
            </div>
        </div>
    )

    return (
        <div className={[styles.wrapper, 'indents'].join(' ')}>
            {order(styles.less)}
            <div className={styles.items}>{
                items?.map((item: PlantInterface, idx) => {
                    const cartExistance = cart.some((obj: CartItemInterface) => obj.productId === item._id)
                    const favoriteExistance = favorites.some((obj: FavoritesItemInterface) => obj.productId === item._id)
                    return (
                        <li key={idx}>
                            <PlantCartItem item={item} profile={moveToProfile} handleCart={handleCart} inCart={cartExistance} handleFavorite={handleFavorites} inFavorite={favoriteExistance} linkTo={linkTo}/>
                        </li>
                    )
                })
            }</div>
            {order(styles.more)}
        </div>
    )
}