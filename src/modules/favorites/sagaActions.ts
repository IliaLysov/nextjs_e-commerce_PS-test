import {createAction} from '@reduxjs/toolkit'
import { FavoritesDBItemInterface, FavoritesItemInterface } from '@/types/favorites'
import { FiltersInterface } from '@/types/filter'

export const addToFavoritesPost = createAction<string>('ADD_TO_FAVORITES_POST')
export const removeFromFavoritesPost = createAction<{favorites: FavoritesDBItemInterface, body: {skip: number, appliedFilters: FiltersInterface | null, sort: any} | null}>('REMOVE_FROM_FAVORITES_POST') //CartId