import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { addToFavorites, removeFromFavorites, setFavorites } from './actions'
import { RootState } from '@/app/store'
import { FavoritesDBItemInterface } from '@/types/favorites'

const favorites = createReducer<FavoritesDBItemInterface[]>([], (builder) => {
    builder
        .addCase(setFavorites, (state, {payload}) => payload)
        .addCase(addToFavorites, (state, {payload}) => {state.push(payload)})
        .addCase(removeFromFavorites, (state, {payload}) => {return state.filter((obj) => obj.productId !== payload)})
        .addDefaultCase((state) => state)
})

const favoritesSelector = (state: RootState) => state.rootReducer.favorites.favorites

export {favoritesSelector}

export default combineReducers({
    favorites,
})