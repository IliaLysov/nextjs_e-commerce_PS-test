import {createAction} from '@reduxjs/toolkit'
import { CartDBItemInterface, CartInfoInterface } from '@/types/cart'
import { PlantInterface } from '@/types/product'

export const addToCart = createAction<CartDBItemInterface>('ADD_TO_CART')
export const removeFromCart = createAction<string>('REMOVE_FROM_CART')
export const setCart = createAction<CartDBItemInterface[]>('SET_CART')

export const setCartItems = createAction<PlantInterface[]>('SET_CART_ITEMS')