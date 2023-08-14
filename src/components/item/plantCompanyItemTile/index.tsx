'use client'

import styles from './styles.module.scss'
import LikeSVG from '@/icons/Like.svg'
import { PlantItemType, PlantOwnerTypeEnum } from '@/types/product'
import { useEffect, useState } from 'react'

export default function PlantCompanyItemTile({item, profile, handleCart, inCart, handleFavorite, inFavorite, linkTo}: {item: any, profile: any, handleCart: any, inCart: boolean, handleFavorite: any, inFavorite: boolean, linkTo: any}) {

    const [cartPending, setCartPending] = useState(false)

    useEffect(() => {
        setCartPending(false)
    }, [inCart])

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {item.images[0]?.location &&
                <div className={styles.imageWrapper}>
                    <img src={item.images[0].location} alt="plant" className={styles.image} />
                    <div className={styles.sellerAvatarWrapper} onClick={e => {e.stopPropagation(); profile(item.sellerName)}}>
                        <img src={item.companyInfo.logo} alt="seller" className={styles.sellerAvatar} />
                    </div>
                </div>
                }
                <div className={styles.name}>{item.name}</div>
                <div className={styles.seller}>{item.companyInfo.latinName}</div>
            </div>
            <div className={styles.orderWrapper}>
                <div className={styles.price}>{`${item.price} ₽`}</div>
            </div>
        </div>
    )
}