import {createAction} from '@reduxjs/toolkit'
import { CartDBItemInterface, CartItemInterface } from '@/types/cart'
import { FiltersInterface } from '@/types/filter'

export const addToCartPost = createAction<CartItemInterface>('ADD_TO_CART_POST')
export const removeFromCartPost = createAction<CartDBItemInterface>('REMOVE_FROM_CART_POST') //CartId
export const getCartItems = createAction<{skip: number, ids: string[]}>('GET_CART_ITEMS')