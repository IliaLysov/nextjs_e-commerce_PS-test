'use client'

import styles from './page.module.scss'
import { CatalogItems, Filters, PlantCatalogItemHorizon, PlantCatalogItemTile } from '@/components'
import { PlantInterface, PlantOwnerTypeEnum } from '@/types/product'
import { useAppDispatch, useAppSelector } from '../store'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { addToCart, addToCartPost, addToFavorites, addToFavoritesPost, appliedFiltersSelector, cartSelector, catalogAppliedFiltersSelector, catalogFiltersSelector, catalogItemsSelector, favoritesSelector, filtersSelector, getCatalogProducts, getMoreCatalogProducts, pendingSelector, removeFromCart, removeFromCartPost, removeFromFavorites, removeFromFavoritesPost, setCatalogAppliedFilters, setProduct } from '@/modules'
import { CartDBItemInterface, CartItemInterface } from '@/types/cart'
import { FavoritesItemInterface } from '@/types/favorites'
import { useSession } from 'next-auth/react'

import FilterSVG from '@/icons/Filter.svg'
import SettingsSVG from '@/icons/Settings.svg'
import TileSVG from '@/icons/Tile.svg'
import HorizonSVG from '@/icons/Horizon.svg'
import { FiltersInterface } from '@/types/filter'

import variables from '@/app/variables.module.scss'
import { compareObjects } from '@/utils/compare'


export default function Catalog() {
    const {data: session} = useSession()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const [skip, setSkip] = useState<number>(0)

    const pending = useAppSelector(pendingSelector)

    const cart: CartDBItemInterface[] = useAppSelector(cartSelector)
    const favorites: FavoritesItemInterface[] = useAppSelector(favoritesSelector)

    const items: PlantInterface[] | null = useAppSelector(catalogItemsSelector)

    useEffect(() => {
        !items && dispatch(getCatalogProducts({skip: 0, appliedFilters: null, sort: {}}))
    }, [])

    //filters-----------------------------------------------

    const [filterTab, setFilterTab] = useState<boolean>(false)
    const initialFilters: FiltersInterface | null = useAppSelector(catalogFiltersSelector)
    const appliedFilters: FiltersInterface | null = useAppSelector(catalogAppliedFiltersSelector)
    const [newFilters, setNewFilters] = useState<FiltersInterface | null>(null)

    useEffect(() => {
        if (appliedFilters) {
            setNewFilters(appliedFilters)
        } else {
            if (initialFilters) {
                setNewFilters(initialFilters)
            }
        }
    }, [initialFilters])

    const updateItemsByFilters = () => {
        dispatch(getCatalogProducts({skip: 0, appliedFilters: newFilters, sort: {}}))
        if (window.innerWidth < Number(variables.phones600)) {
            setFilterTab(false)
        }
    }

    const resetFilters = () => {
        dispatch(getCatalogProducts({skip: 0, appliedFilters: null, sort: {}}))
        initialFilters && dispatch(setCatalogAppliedFilters(null))
        if (initialFilters) {
            setNewFilters(initialFilters)
        }
        if (window.innerWidth < Number(variables.phones600)) {
            setFilterTab(false)
        }
    }

    useEffect(() => {
        const comparison = compareObjects(initialFilters, appliedFilters)
        if (!comparison) {
            setSkip(0)
        } else {
            const comparison2 = compareObjects(initialFilters, newFilters)
            if (comparison2) {
                setSkip(0)
            }
        }
    }, [appliedFilters])

    //-----------------------------------------------------

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
                localStorage.setItem('localCart', JSON.stringify(cart.filter(obj => obj.productId !== currentCartItem.productId)))
            } else {
                dispatch(addToCart({productId: _id, count: 1, cartId: ''}))
                localStorage.setItem('localCart', JSON.stringify([...cart, {productId: _id, count: 1}]))
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
                localStorage.setItem('localFavorites', JSON.stringify(favorites.filter(obj => obj.productId !== currentFavoritesItem.productId)))
            } else {
                dispatch(addToFavorites({productId: _id}))
                localStorage.setItem('localFavorites', JSON.stringify([...favorites, {productId: _id}]))
            }
        }
    }

    //-----------------------------------------------------

    const [horizon, setHorizon] = useState(true)

    const linkTo = (item: any) => {
        dispatch(setProduct(item))
        const {name, _id} = item 
        const link = name.toLocaleLowerCase().split(' ').join('-') + `-${_id}`
        router.push(`/catalog/${link}`)
    }

    const showMore = () => {
        if (items) {
            dispatch(getMoreCatalogProducts({skip: skip+10, appliedFilters: appliedFilters, sort: {}}))
            setSkip(prev => prev + 10)
        }
    }

    return (
        <div className={[styles.wrapper, 'indents'].join(' ')}>
            <div className={styles.top}>
                <div className={styles.topSide}>
                    <div className={[styles.topBtn, filterTab && styles.active].join(' ')} onClick={() => setFilterTab(prev => !prev)}>
                        <div className={styles.topBtnName}>Фильтры</div>
                        <FilterSVG className={styles.topBtnIcon}/>
                    </div>
                    <div className={styles.topBtn}>
                        <div className={styles.topBtnName}>Сортировать по</div>
                        <SettingsSVG className={styles.topBtnIcon}/>
                    </div>
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
            <div className={styles.contentWrapper}>
                <div className={[styles.filterWrapper, filterTab && styles.active].join(' ')}>
                    <Filters filters={initialFilters} newFilters={newFilters} setNewFilters={setNewFilters} update={updateItemsByFilters} appliedFilters={appliedFilters} resetFilters={resetFilters}/>
                </div>
                <div className={styles.container}>
                    <div className={[styles.items, horizon && styles.horizon].join(' ')}>
                        {items && items.map((item: any, idx: number) => {
                            const cartExistance = cart.some((obj: CartItemInterface) => obj.productId === item._id)
                            const favoriteExistance = favorites.some((obj: FavoritesItemInterface) => obj.productId === item._id)
                            return <li key={idx}>
                                {
                                    horizon
                                    ?
                                    <PlantCatalogItemHorizon item={item} profile={moveToProfile} handleCart={handleCart} inCart={cartExistance} handleFavorite={handleFavorites} inFavorite={favoriteExistance} linkTo={linkTo}/>
                                    :
                                    <PlantCatalogItemTile item={item} profile={moveToProfile} handleCart={handleCart} inCart={cartExistance} handleFavorite={handleFavorites} inFavorite={favoriteExistance} linkTo={linkTo}/>
                                }
                            </li>})}
                    </div>
                    {items && appliedFilters && items.length < appliedFilters?.count && skip + 10 <= items.length && <button className={styles.moreBtn} onClick={() => showMore()}>Загрузить еще</button>}
                </div>
            </div>
        </div>
    )
}