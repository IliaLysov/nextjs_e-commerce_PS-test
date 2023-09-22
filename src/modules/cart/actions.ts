import {createAction} from '@reduxjs/toolkit'
import { CartDBItemInterface, CartInfoInterface, OrderItemInterface } from '@/types/cart'
import { PlantInterface } from '@/types/product'

export const addToCart = createAction<CartDBItemInterface>('ADD_TO_CART')
export const removeFromCart = createAction<string>('REMOVE_FROM_CART')
export const changeCartCount = createAction<CartDBItemInterface>('CHANGE_CART_COUNT')
export const setCart = createAction<CartDBItemInterface[]>('SET_CART')

export const setCartItems = createAction<PlantInterface[]>('SET_CART_ITEMS')
export const setMoreCartItems = createAction<PlantInterface[]>('SET_MORE_CART_ITEMS')

export const setOrderItems = createAction<OrderItemInterface[]>('SET_ORDER_ITEMS')
export const setOrderStatus = createAction<string>('SET_ORDER_STATUS')