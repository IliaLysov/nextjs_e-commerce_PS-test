'use client'

import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import { CartItems, PlantCatalogItemHorizon } from '@/components'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { cartInfoSelector, cartItemsSelector, cartSelector, getCartItems } from '@/modules'
import { PlantInterface } from '@/types/product'
import { CartDBItemInterface, CartInfoInterface } from '@/types/cart'

export default function Cart() {
    const {data: session} = useSession()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [skip, setSkip] = useState<number>(0)

    const cart: CartDBItemInterface[] = useAppSelector(cartSelector)
    
    const items: PlantInterface[] | null = useAppSelector(cartItemsSelector)
    const cartInfo: CartInfoInterface | null = useAppSelector(cartInfoSelector)
    
    useEffect(() => {
        if (items) {
            const ids = cart.map((obj: CartDBItemInterface) => obj.productId)
            const isNotActual = cart.map((obj: CartDBItemInterface) => {
                const boolArr = items.map((item: PlantInterface) => obj.productId === item._id)
                return !boolArr.includes(true)
            })
            const refresh = isNotActual.includes(true) || cart.length !== items.length
            refresh && dispatch(getCartItems({skip, ids}))
        } else {
            const ids = cart.map((obj: CartDBItemInterface) => obj.productId)
            dispatch(getCartItems({skip, ids}))
        }
    }, [session])

    console.log('items', items)

    return (
        <div className={[styles.wrapper, 'indents'].join(' ')}>
            <CartItems/>
            <div className={styles.items}>{
                items?.map((item: PlantInterface) => {
                    return <div>{item.name}</div>
                })
            }</div>
        </div>
    )
}