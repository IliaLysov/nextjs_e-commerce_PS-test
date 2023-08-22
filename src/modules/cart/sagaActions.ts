import {createAction} from '@reduxjs/toolkit'
import { CartDBItemInterface, CartItemInterface } from '@/types/cart'
import { FiltersInterface } from '@/types/filter'

export const addToCartPost = createAction<CartItemInterface>('ADD_TO_CART_POST')
export const removeFromCartPost = createAction<{cart: CartDBItemInterface, body: {skip: number, appliedFilters: FiltersInterface | null, sort: any} | null}>('REMOVE_FROM_CART_POST') //CartId