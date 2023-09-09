'use client'

import styles from './styles.module.scss'
import {useState, useEffect} from 'react'
import { Filters, PlantCatalogItemTile, PlantCatalogItemHorizon, PlantCompanyItemTile, PlantCompanyItemHorizon } from '../..'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { filtersSelector, appliedFiltersSelector, setAppliedFilters, allProductsGet, ownProductsGet, productsSelector, setModal, setFilters, setProducts, modalSelector, setProduct, cartSelector, removeFromCartPost, addToCartPost, removeFromCart, addToCart, favoritesSelector, removeFromFavoritesPost, addToFavoritesPost, removeFromFavorites, addToFavorites, favoritesProductsGet, cartProductsGet, deleteProduct } from '@/modules'
import { FiltersInterface } from '@/types/filter'
import { PlantOwnerType, PlantOwnerTypeEnum } from '@/types/product'
import { ModalTypeEnum } from '@/types/modal'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CartDBItemInterface, CartItemInterface } from '@/types/cart'
import { FavoritesDBItemInterface, FavoritesItemInterface } from '@/types/favorites'

import variables from '@/app/variables.module.scss'

import FilterSVG from '@/icons/Filter.svg'
import SettingsSVG from '@/icons/Settings.svg'
import TileSVG from '@/icons/Tile.svg'
import HorizonSVG from '@/icons/Horizon.svg'
import { compareArraysByObjectID, compareObjects } from '@/utils/compare'

export default function CatalogItems({type,}: {type: PlantOwnerType}) {
    const {data: session} = useSession()
    const dispatch = useAppDispatch()
    const router = useRouter()

    const initialLimit = 10
    const [items, setItems] = useState<any[]>([])
    const [limit, setLimit] = useState<number>(initialLimit)

    let get: any

    if (type === PlantOwnerTypeEnum.General) {
        get = allProductsGet
    } else if (type === PlantOwnerTypeEnum.Owner) {
        get = ownProductsGet
    } else if (type === PlantOwnerTypeEnum.Favorites) {
        get = favoritesProductsGet
    } else if (type === PlantOwnerTypeEnum.Cart) {
        get = cartProductsGet
    } else {
        console.error('Invalid items type')
    }

    let newItems = useAppSelector(productsSelector)
    let modal = useAppSelector(modalSelector)

    const cart = useAppSelector(cartSelector)
    const favorites = useAppSelector(favoritesSelector)

    //filters-----------------------------------------------

    const [filterTab, setFilterTab] = useState<boolean>(false)
    const initialFilters: FiltersInterface | null = useAppSelector(filtersSelector)
    const appliedFilters: FiltersInterface | null = useAppSelector(appliedFiltersSelector)
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
        dispatch(get({skip: 0, appliedFilters: newFilters, sort: {}, organizationId: session && session.company?._id}))
        if (window.innerWidth < Number(variables.phones600)) {
            setFilterTab(false)
        }
    }

    const resetFilters = () => {
        dispatch(get({skip: 0, appliedFilters: null, sort: {}, organizationId: session && session.company?._id}))
        initialFilters && dispatch(setAppliedFilters(null))
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
            setLimit(initialLimit)
            setItems(newItems)
        } else {
            const comparison2 = compareObjects(initialFilters, newFilters)
            if (comparison2) {
                setLimit(initialLimit)
                setItems(newItems)
            }
        }
    }, [appliedFilters])

    //---------------------------------------------------------

    useEffect(() => {
        (session || (type === PlantOwnerTypeEnum.General || type === PlantOwnerTypeEnum.Favorites || type === PlantOwnerTypeEnum.Cart) && session === null) && items.length === 0 && dispatch(get({skip: 0, appliedFilters: null, sort: {}, organizationId: session && session.company?._id}))
    }, [session])

    useEffect(() => {
        return () => {
            dispatch(setProducts([]))
            dispatch(setFilters(null))
            dispatch(setAppliedFilters(null))
        }
    }, [])

    useEffect(() => {
        const refresh = () => {
            const comparison = compareObjects(initialFilters, appliedFilters)
            if (type === PlantOwnerTypeEnum.Cart && comparison) {
                const refreshItems = items.filter((itemObj: any) => {
                    const boolArr = cart.map((obj: CartDBItemInterface) => obj.productId === itemObj._id)
                    return boolArr.includes(true)
                })
    
                const newItem = newItems.filter((itemObj: any) => {
                    const boolArr = refreshItems.map((obj: any) => obj._id === itemObj._id)
                    return !boolArr.includes(true)
                })
                
                setItems([...refreshItems, ...newItem])
            }
    
            if (type === PlantOwnerTypeEnum.Favorites && comparison) {
                const refreshItems = items.filter((itemObj: any) => {
                    const boolArr = favorites.map((obj: FavoritesDBItemInterface) => obj.productId === itemObj._id)
                    return boolArr.includes(true)
                })
    
                const newItem = newItems.filter((itemObj: any) => {
                    const boolArr = refreshItems.map((obj: any) => obj._id === itemObj._id)
                    return !boolArr.includes(true)
                })
                
                setItems([...refreshItems, ...newItem])
            }
        }

        items.length === 0 ? setItems(newItems) :
        limit > items.length && items.length % initialLimit === 0 ? setItems([...items, ...newItems]) : refresh()
    }, [newItems])

    useEffect(() => {
        setItems(newItems)
    }, [modal])

    const showMore = () => {
        dispatch(get({skip: limit, appliedFilters: appliedFilters, sort: {}, organizationId: session && session.company?._id}))
        setLimit(prev => items.length === limit ? prev + initialLimit : prev)
    }

    const linkTo = (item: any) => {
        if (type === PlantOwnerTypeEnum.General || type === PlantOwnerTypeEnum.Favorites || type === PlantOwnerTypeEnum.Cart) {
            dispatch(setProduct(item))
            const {name, _id} = item 
            const link = name.toLocaleLowerCase().split(' ').join('-') + `-${_id}`
            router.push(`/catalog/${link}`)
        } else if (type === PlantOwnerTypeEnum.Owner) {
            dispatch(setModal({type: ModalTypeEnum.PlantForm, data: item}))
        } else {
            console.error('Invalid items type')
        }
    }

    const moveToProfile = (name: string) => {
        router.push(`/${name}`)
    }

    //cart-----------------------------------------------

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

    useEffect(() => {
        if (!session) {
            const localCart = JSON.stringify(cart)
            localStorage.setItem('localCart', localCart)
        }
    }, [cart])

    //favorites-----------------------------------------

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

    useEffect(() => {
        if (!session) {
            const localFavorites = JSON.stringify(favorites)
            localStorage.setItem('localFavorites', localFavorites)
        }
    }, [favorites])

    const [horizon, setHorizon] = useState(true)

    return (
        <>
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
            <div className={styles.wrapper}>
                <div className={[styles.filterWrapper, filterTab && styles.active].join(' ')}>
                    <Filters filters={initialFilters} newFilters={newFilters} setNewFilters={setNewFilters} update={updateItemsByFilters} appliedFilters={appliedFilters} resetFilters={resetFilters}/>
                </div>
                <div className={styles.container}>
                    <div className={[styles.items, horizon && styles.horizon].join(' ')}>
                        {type === PlantOwnerTypeEnum.Owner && <div className={styles.addItem} onClick={() => dispatch(setModal({type: ModalTypeEnum.PlantForm}))}>
                            <h2 className={styles.addItemTitle}>Добавить новое растение</h2>
                            <p className={styles.addItemDescription}>После создания, растение сразу будет доступно в каталоге</p>    
                        </div>}
                        {items.map((item: any, idx: number) => {
                            const cartExistance = cart.some((obj: CartItemInterface) => obj.productId === item._id)
                            const favoriteExistance = favorites.some((obj: FavoritesItemInterface) => obj.productId === item._id)
                            return <li key={idx}>
                                {
                                    (type === PlantOwnerTypeEnum.General || type === PlantOwnerTypeEnum.Favorites || type === PlantOwnerTypeEnum.Cart) && 
                                    (horizon
                                    ?
                                    <PlantCatalogItemHorizon item={item} profile={moveToProfile} handleCart={handleCart} inCart={cartExistance} handleFavorite={handleFavorites} inFavorite={favoriteExistance} linkTo={linkTo}/>
                                    :
                                    <PlantCatalogItemTile item={item} profile={moveToProfile} handleCart={handleCart} inCart={cartExistance} handleFavorite={handleFavorites} inFavorite={favoriteExistance} linkTo={linkTo}/>)
                                }
                                {
                                    type === PlantOwnerTypeEnum.Owner &&
                                    (horizon
                                        ?
                                        <PlantCompanyItemHorizon item={item} profile={moveToProfile} linkTo={linkTo}/>
                                        :
                                        <PlantCompanyItemTile item={item} profile={moveToProfile} linkTo={linkTo}/>)
                                }
                            </li>})}
                    </div>
                    {items.length !== appliedFilters?.count && items.length === limit && <button className={styles.moreBtn} onClick={() => showMore()}>Загрузить еще</button>}
                </div>
            </div>
        </>
    )
}