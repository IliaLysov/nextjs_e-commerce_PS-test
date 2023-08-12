'use client'

import styles from './styles.module.scss'
import {useState, useEffect} from 'react'
import { Filters, Item } from '..'
import { useAppDispatch, useAppSelector } from '@/app/store'
import { filtersSelector, appliedFiltersSelector, setAppliedFilters, allProductsGet, ownProductsGet, productsSelector, setModal, setFilters, setProducts, modalSelector, setProduct, cartSelector, removeFromCartPost, addToCartPost, removeFromCart, addToCart, favoritesSelector, removeFromFavoritesPost, addToFavoritesPost, removeFromFavorites, addToFavorites } from '@/modules'
import { FiltersInterface } from '@/types/filter'
import { PlantOwnerTypeEnum } from '@/types/product'
import { ModalTypeEnum } from '@/types/modal'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { CartItemInterface } from '@/types/cart'
import { FavoritesItemInterface } from '@/types/favorites'
import Image from 'next/image'
import FilterSVG from '@/icons/Filter.svg'
import SettingsSVG from '@/icons/Settings.svg'
import variables from '@/app/variables.module.scss'

export default function Items({type}: {type: string}) {
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
                dispatch(setAppliedFilters(initialFilters))
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
        setLimit(initialLimit)
        setItems(newItems)
    }, [appliedFilters])

    //---------------------------------------------------------

    useEffect(() => {
        (session || type === PlantOwnerTypeEnum.General && session === null) && items.length === 0 && dispatch(get({skip: 0, appliedFilters: null, sort: {}, organizationId: session && session.company?._id}))
    }, [session])

    useEffect(() => {
        return () => {
            dispatch(setProducts([]))
            dispatch(setFilters(null))
            dispatch(setAppliedFilters(null))
        }
    }, [])

    useEffect(() => {
        items.length === 0 ? setItems(newItems) :
        limit > items.length && items.length % initialLimit === 0 && setItems([...items, ...newItems])

        // limit > items.length && items.length % initialLimit === 0 ? setItems([...items, ...newItems]) :
        // setItems(newItems)

    }, [newItems])

    useEffect(() => {
        setItems(newItems)
    }, [modal])

    const showMore = () => {
        dispatch(get({skip: limit, appliedFilters: appliedFilters, sort: {}, organizationId: session && session.company?._id}))
        setLimit(prev => items.length === limit ? prev + initialLimit : prev)
    }

    const linkTo = (item: any) => {
        if (type === PlantOwnerTypeEnum.General) {
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

    return (
        <>
            <div className={styles.top}>
                <div className={[styles.topBtn, filterTab && styles.active].join(' ')} onClick={() => setFilterTab(prev => !prev)}>
                    <div className={styles.topBtnName}>Фильтры</div>
                    <FilterSVG className={styles.topBtnIcon}/>
                </div>
                <div className={styles.topBtn}>
                    <div className={styles.topBtnName}>Сортировать по</div>
                    <SettingsSVG className={styles.topBtnIcon}/>
                </div>
            </div>
            <div className={styles.wrapper}>
                <div className={[styles.filterWrapper, filterTab && styles.active].join(' ')}>
                    <Filters filters={initialFilters} newFilters={newFilters} setNewFilters={setNewFilters} update={updateItemsByFilters} appliedFilters={appliedFilters} resetFilters={resetFilters}/>
                </div>
                <div className={styles.container}>
                    <div className={styles.items}>
                        {type === PlantOwnerTypeEnum.Owner && <div className={styles.addItem} onClick={() => dispatch(setModal({type: ModalTypeEnum.PlantForm}))}>
                            <h2 className={styles.addItemTitle}>Добавить новое растение</h2>
                            <p className={styles.addItemDescription}>После создания, растение сразу будет доступно в каталоге</p>    
                        </div>}
                        {items.map((item: any, idx: number) => {
                            const cartExistance = cart.some((obj: CartItemInterface) => obj.productId === item._id)
                            const favoriteExistance = favorites.some((obj: FavoritesItemInterface) => obj.productId === item._id)
                            return <li key={idx} onClick={() => linkTo(item)}>
                                <Item item={item} profile={moveToProfile} handleCart={handleCart} inCart={cartExistance} handleFavorite={handleFavorites} inFavorite={favoriteExistance} type={type}/>
                            </li>})}
                    </div>
                    {items.length === limit && <button className={styles.moreBtn} onClick={() => showMore()}>Загрузить еще</button>}
                </div>
            </div>
        </>
    )
}