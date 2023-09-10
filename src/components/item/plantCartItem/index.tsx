'use client'

import styles from './styles.module.scss'
import { PlantItemType, PlantOwnerTypeEnum } from '@/types/product'
import { useEffect, useState } from 'react'
import AddToCartSVG from '@/icons/AddToCart.svg'
import RemoveFromCartSVG from '@/icons/RemoveFromCart.svg'
import LikeSVG from '@/icons/Like.svg'
import { CartDBItemInterface } from '@/types/cart'
import { debounce } from 'lodash'
import { useAppDispatch } from '@/app/store'
import { removeFromCart, removeFromCartPost } from '@/modules'

export default function PlantCartItem({item, profile, inCart, handleFavorite, inFavorite, linkTo, cartItem, changeCartCount, session}: {item: any, profile: any, inCart: boolean, handleFavorite: any, inFavorite: boolean, linkTo: any, cartItem: CartDBItemInterface, changeCartCount: any, session: any}) {
    const dispatch = useAppDispatch()

    const [cartPending, setCartPending] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        setCartPending(false)
    }, [inCart])

    const [count, setCount] = useState<number>(cartItem.count)
    const [price, setPrice] = useState<number>(item.price * cartItem.count)

    const debouncedUpdateCart = debounce(() => {setIsTyping(false)}, 2000)

    const setCurrent = (newCount: number) => {
        setCount(newCount)
        setPrice(item.price * newCount)
    }

    useEffect(() => {
        setCount(cartItem.count)
        setPrice(item.price * cartItem.count)
    }, [])

    useEffect(() => {
        if (!isTyping) {
            setIsTyping(true)
            debouncedUpdateCart()
        }
    }, [count])

    useEffect(() => {
        if (!isTyping && item.price * cartItem.count !== price) {
            changeCartCount({...cartItem, count})
        }
    }, [isTyping])

    const handleCart = () => {
        if (session) {
            dispatch(removeFromCartPost(cartItem))
        } else {
            dispatch(removeFromCart(cartItem.productId))
        }
    }


    return (
        <div className={styles.wrapper}>
            <LikeSVG className={[styles.like, inFavorite && styles.active].join(' ')} onClick={(e: any) => {e.stopPropagation(); handleFavorite(item)}}/>
            <div className={styles.count}>
                <div className={styles.countBtn} onClick={() => count > 1 && setCurrent(count - 1)}>-</div>
                <input className={styles.countInput} type="text" value={count} onChange={e => !Number.isNaN(Number(e.target.value)) && Number(e.target.value) > 0 && setCurrent(Number(e.target.value))}/>
                <div className={styles.countBtn} onClick={() => setCurrent(count + 1)}>+</div>
            </div>
            <div className={[styles.orderInfo, cartPending && styles.pending, inCart && styles.active].join(' ')}>
                <div className={styles.price}>{`${price.toString().split('').reverse().join('').match(/.{1,3}/g)?.join(' ').split('').reverse().join('')} ₽`}</div>
                <button className={styles.orderBtn}  onClick={() => handleCart()}>
                    {
                        inCart ?
                        <RemoveFromCartSVG className={styles.orderIcon}/>
                        :
                        <AddToCartSVG className={styles.orderIcon}/>
                    }
                </button>
            </div>
            <div className={styles.side}>
                <div className={styles.imageWrapper}>
                    <img src={item.images[0].location} alt="plant" className={styles.image} onClick={() => linkTo(item)}/>
                    <div className={styles.companyLogoWrapper} onClick={() => profile(item.companyInfo.latinName)}>
                        <img src={item.companyInfo.logo} alt="comapny" className={styles.companyLogo}/>
                    </div>
                </div>
                <div className={styles.info}>
                    <div className={styles.plantNames}>
                        <h2 className={styles.name} onClick={() => linkTo(item)}>{item.name}</h2>
                        <div className={styles.latinName}>{item.latinName}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}