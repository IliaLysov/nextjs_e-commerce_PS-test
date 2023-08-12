import {createAction} from '@reduxjs/toolkit'
import { CartDBItemInterface } from '@/types/cart'

export const addToCart = createAction<CartDBItemInterface>('ADD_TO_CART')
export const removeFromCart = createAction<string>('REMOVE_FROM_CART')
export const setCart = createAction<CartDBItemInterface[]>('SET_CART')
