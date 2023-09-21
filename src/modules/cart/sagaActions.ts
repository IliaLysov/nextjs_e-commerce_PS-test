import {createAction} from '@reduxjs/toolkit'
import { CartDBItemInterface, CartItemInterface } from '@/types/cart'
import { FiltersInterface } from '@/types/filter'

export const addToCartPost = createAction<CartItemInterface>('ADD_TO_CART_POST')
export const removeFromCartPost = createAction<CartDBItemInterface>('REMOVE_FROM_CART_POST') //CartId
export const changeCartCountPost = createAction<CartDBItemInterface>('CHANGE_CART_COUNT_POST')

export const getCartItems = createAction<{skip: number, ids: string[]}>('GET_CART_ITEMS')
export const getMoreCartItems = createAction<{skip: number, ids: string[]}>('GET_MORE_CART_ITEMS')

export const getOrderData = createAction('GET_ORDER_DATA')