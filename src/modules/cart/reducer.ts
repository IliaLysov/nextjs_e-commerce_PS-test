import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { addToCart, removeFromCart, setCart } from './actions'
import { RootState } from '@/app/store'
import { CartDBItemInterface } from '@/types/cart'

const cart = createReducer<CartDBItemInterface[]>([], (builder) => {
    builder
        .addCase(setCart, (state, {payload}) => payload)
        .addCase(addToCart, (state, {payload}) => {state.push(payload)})
        .addCase(removeFromCart, (state, {payload}) => {return state.filter((obj) => obj.productId !== payload)})
        .addDefaultCase((state) => state)
})

const cartSelector = (state: RootState) => state.rootReducer.cart.cart

export {cartSelector}

export default combineReducers({
    cart,
})