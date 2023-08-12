import {createAction} from '@reduxjs/toolkit'
import { FavoritesDBItemInterface } from '@/types/favorites'

export const addToFavorites = createAction<FavoritesDBItemInterface>('ADD_TO_FAVORITES')
export const removeFromFavorites = createAction<string>('REMOVE_FROM_FAVORITES')
export const setFavorites = createAction<FavoritesDBItemInterface[]>('SET_FAVORITES')
