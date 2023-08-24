import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { addToCart, removeFromCart, setCart, setCartInfo, setCartItems } from './actions'
import { RootState } from '@/app/store'
import { CartDBItemInterface, CartInfoInterface } from '@/types/cart'
import { PlantInterface } from '@/types/product'

const cart = createReducer<CartDBItemInterface[]>([], (builder) => {
    builder
        .addCase(setCart, (state, {payload}) => payload)
        .addCase(addToCart, (state, {payload}) => {state.push(payload)})
        .addCase(removeFromCart, (state, {payload}) => {return state.filter((obj) => obj.productId !== payload)})
        .addDefaultCase((state) => state)
})

const cartItems = createReducer<PlantInterface[] | null>(null, (builder) => {
    builder.addCase(setCartItems, (state, {payload}) => payload)
})

const cartInfo = createReducer<CartInfoInterface | null>(null, (builder) => {
    builder.addCase(setCartInfo, (state, {payload}) => payload)
})

export default combineReducers({
    cart,
    cartItems,
    cartInfo
})

const cartSelector = (state: RootState) => state.rootReducer.cart.cart
const cartItemsSelector = (state: RootState) => state.rootReducer.cart.cartItems
const cartInfoSelector = (state: RootState) => state.rootReducer.cart.cartInfo

export {
    cartSelector,
    cartItemsSelector,
    cartInfoSelector
}
