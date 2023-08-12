'use client'

import styles from './styles.module.scss'
// import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import LikeSVG from '@/icons/Like.svg'
import filledLike from '@/icons/filledLike.svg'
import { PlantOwnerTypeEnum } from '@/types/product'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Item({item, profile, handleCart, inCart, handleFavorite, inFavorite, type}: {item: any, profile: any, handleCart: any, inCart: boolean, handleFavorite: any, inFavorite: boolean, type: string}) {

    const [cartPending, setCartPending] = useState(false)

    useEffect(() => {
        setCartPending(false)
    }, [inCart])

    const handleCartMiddleware = () => {

    }

    return (
        <div className={styles.wrapper}>
            <div className={[styles.content, type !== PlantOwnerTypeEnum.General && styles.owner].join(' ')}>
                {item.images[0]?.location &&
                <div className={styles.imageWrapper}>
                    <img src={item.images[0].location} alt="plant" className={styles.image} />
                    {type === PlantOwnerTypeEnum.General && <>
                        <div className={styles.favorite} onClick={e => {e.stopPropagation(); handleFavorite(item)}}>
                            <LikeSVG className={[styles.like, inFavorite && styles.active].join(' ')}/>
                        </div>
                        <div className={styles.sellerAvatarWrapper} onClick={e => {e.stopPropagation(); profile(item.sellerName)}}>
                            {
                                item.companyInfo.logo ?
                                <img src={item.companyInfo.logo} alt="seller" className={styles.sellerAvatar} />
                                :
                                <div className={styles.sellerFirstLetter}>{item.companyInfo.latinName.charAt(0)}</div>
                            }
                        </div>
                    </>
                    }
                </div>
                }
                <div className={styles.name}>{item.name}</div>
                <div className={styles.seller}>{item.companyInfo.latinName}</div>
            </div>
            <div className={[styles.orderWrapper, cartPending && styles.pending, inCart && styles.active].join(' ')}  onClick={e => {e.stopPropagation(); !cartPending && inCart && handleCart(item); setCartPending(true)}}>
                <div className={styles.price}>{`${item.price} ₽`}</div>
                {/* <button className={styles.button} onClick={() => {!inCart && handleCart(item)}}></button> */}
                {type === PlantOwnerTypeEnum.General && <button className={styles.button} onClick={() => {!cartPending && !inCart && handleCart(item); setCartPending(true)}}></button>}
            </div>
        </div>
    )
}