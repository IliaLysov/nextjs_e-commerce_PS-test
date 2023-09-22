import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { addToCart, changeCartCount, removeFromCart, setCart, setCartItems, setMoreCartItems, setOrderItems, setOrderStatus } from './actions'
import { RootState } from '@/app/store'
import { CartDBItemInterface, CartInfoInterface, OrderItemInterface } from '@/types/cart'
import { PlantInterface } from '@/types/product'

const cart = createReducer<CartDBItemInterface[]>([], (builder) => {
    builder
        .addCase(setCart, (state, {payload}) => payload)
        .addCase(addToCart, (state, {payload}) => {state.push(payload)})
        .addCase(removeFromCart, (state, {payload}) => {return state.filter((obj) => obj.productId !== payload)})
        .addCase(changeCartCount, (state, {payload}) => {
            return state.map((obj) => {
                if (obj.productId === payload.productId) {
                    return payload
                }
                return obj
            })
            
        }            
        )
        .addDefaultCase((state) => state)
})

const cartItems = createReducer<PlantInterface[] | null>(null, (builder) => {
    builder
        .addCase(setCartItems, (state, {payload}) => payload)
        .addCase(removeFromCart, (state, {payload}) => state && state.filter((obj) => obj._id !== payload))
        .addCase(setMoreCartItems, (state, {payload}) => state && [...state, ...payload])
})

const orderItems = createReducer<OrderItemInterface[]>([], (builder) => {
    builder
        .addCase(setOrderItems, (state, {payload}) => payload)
})

const orderStatus = createReducer<string>('not started', (builder) => {
    builder
        .addCase(setOrderStatus, (state, {payload}) => payload)
})

export default combineReducers({
    cart,
    cartItems,
    orderItems,
    orderStatus,
})

const cartSelector = (state: RootState) => state.rootReducer.cart.cart
const cartItemsSelector = (state: RootState) => state.rootReducer.cart.cartItems
const orderItemsSelector = (state: RootState) => state.rootReducer.cart.orderItems
const orderStatusSelector = (state: RootState) => state.rootReducer.cart.orderStatus

export {
    cartSelector,
    cartItemsSelector,
    orderItemsSelector,
    orderStatusSelector,
}
