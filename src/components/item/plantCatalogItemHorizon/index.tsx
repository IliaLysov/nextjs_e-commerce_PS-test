'use client'

import styles from './styles.module.scss'
import { PlantItemType, PlantOwnerTypeEnum } from '@/types/product'
import { useEffect, useState } from 'react'
import AddToCartSVG from '@/icons/AddToCart.svg'
import RemoveFromCartSVG from '@/icons/RemoveFromCart.svg'
import LikeSVG from '@/icons/Like.svg'

export default function PlantCatalogItemHorizon({item, profile, handleCart, inCart, handleFavorite, inFavorite, linkTo}: {item: any, profile: any, handleCart: any, inCart: boolean, handleFavorite: any, inFavorite: boolean, linkTo: any}) {

    const [cartPending, setCartPending] = useState(false)

    useEffect(() => {
        setCartPending(false)
    }, [inCart])

    return (
        <div className={styles.wrapper}>
            <LikeSVG className={[styles.like, inFavorite && styles.active].join(' ')} onClick={(e: any) => {e.stopPropagation(); handleFavorite(item)}}/>
            <div className={[styles.orderInfo, cartPending && styles.pending, inCart && styles.active].join(' ')}>
                <div className={styles.price}>{`${item.price} ₽`}</div>
                <button className={styles.orderBtn}  onClick={() => {!cartPending && handleCart(item); setCartPending(true)}}>
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
                    <div className={styles.companyLogoWrapper}>
                        <img src={item.companyInfo.logo} alt="comapny" className={styles.companyLogo} onClick={() => profile(item.companyInfo.latinName)}/>
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