'use client'

import styles from './styles.module.scss'
import LikeSVG from '@/icons/Like.svg'
import { PlantItemType, PlantOwnerTypeEnum } from '@/types/product'
import { useEffect, useState } from 'react'

export default function PlantCatalogItemTile({item, profile, handleCart, inCart, handleFavorite, inFavorite, linkTo}: {item: any, profile: any, handleCart: any, inCart: boolean, handleFavorite: any, inFavorite: boolean, linkTo: any}) {

    const [cartPending, setCartPending] = useState(false)

    useEffect(() => {
        setCartPending(false)
    }, [inCart])

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {item.images[0]?.location &&
                <div className={styles.imageWrapper}>
                    <img src={item.images[0].location} alt="plant" className={styles.image} onClick={() => linkTo(item)}/>
                    <LikeSVG className={[styles.like, inFavorite && styles.active].join(' ')} onClick={(e: any) => {e.stopPropagation(); handleFavorite(item)}}/>
                    <div className={styles.sellerAvatarWrapper} onClick={e => {e.stopPropagation(); profile(item.sellerName)}}>
                        {
                            item.companyInfo.logo ?
                            <img src={item.companyInfo.logo} alt="seller" className={styles.sellerAvatar} />
                            :
                            <div className={styles.sellerFirstLetter}>{item.companyInfo.latinName.charAt(0)}</div>
                        }
                    </div>
                </div>
                }
                <div className={styles.name} onClick={() => linkTo(item)}>{item.name}</div>
                <div className={styles.seller}>{item.companyInfo.latinName}</div>
            </div>
            <div className={[styles.orderWrapper, cartPending && styles.pending, inCart && styles.active].join(' ')}  onClick={e => {e.stopPropagation(); !cartPending && inCart && handleCart(item)}}>
                <div className={styles.price}>{`${item.price} ₽`}</div>
                <button className={styles.button} onClick={() => {!cartPending && !inCart && handleCart(item); setCartPending(true)}}></button>
            </div>
        </div>
    )
}