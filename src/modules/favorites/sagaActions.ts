import {createAction} from '@reduxjs/toolkit'
import { FavoritesDBItemInterface, FavoritesItemInterface } from '@/types/favorites'
import { FiltersInterface } from '@/types/filter'

export const addToFavoritesPost = createAction<string>('ADD_TO_FAVORITES_POST')
export const removeFromFavoritesPost = createAction<FavoritesDBItemInterface>('REMOVE_FROM_FAVORITES_POST') //CartId
export const getFavoritesItems = createAction<{skip: number, ids: string[]}>('GET_FAVORITES_ITEMS')