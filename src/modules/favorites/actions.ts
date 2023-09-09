import {createAction} from '@reduxjs/toolkit'
import { FavoritesDBItemInterface } from '@/types/favorites'
import { PlantInterface } from '@/types/product'

export const addToFavorites = createAction<FavoritesDBItemInterface>('ADD_TO_FAVORITES')
export const removeFromFavorites = createAction<string>('REMOVE_FROM_FAVORITES')
export const setFavorites = createAction<FavoritesDBItemInterface[]>('SET_FAVORITES')

export const setFavoritesItems = createAction<PlantInterface[]>('SET_FAVORITES_ITEMS')