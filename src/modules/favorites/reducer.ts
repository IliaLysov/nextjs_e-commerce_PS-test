import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { addToFavorites, removeFromFavorites, setFavorites, setFavoritesItems } from './actions'
import { RootState } from '@/app/store'
import { FavoritesDBItemInterface } from '@/types/favorites'
import { PlantInterface } from '@/types/product'

const favorites = createReducer<FavoritesDBItemInterface[]>([], (builder) => {
    builder
        .addCase(setFavorites, (state, {payload}) => payload)
        .addCase(addToFavorites, (state, {payload}) => {state.push(payload)})
        .addCase(removeFromFavorites, (state, {payload}) => {return state.filter((obj) => obj.productId !== payload)})
        .addDefaultCase((state) => state)
})

const favoritesItems = createReducer<PlantInterface[] | null>(null, (builder) => {
    builder
        .addCase(setFavoritesItems, (state, {payload}) => payload)
        .addCase(removeFromFavorites, (state, {payload}) => state && state.filter((obj) => obj._id !== payload))
})

export default combineReducers({
    favorites,
    favoritesItems,
})

const favoritesSelector = (state: RootState) => state.rootReducer.favorites.favorites
const favoritesItemsSelector = (state: RootState) => state.rootReducer.favorites.favoritesItems

export {favoritesSelector, favoritesItemsSelector}