import {createAction} from '@reduxjs/toolkit'
import { FiltersInterface } from '@/types/filter'
import { PlantInterface } from '@/types/product'

export const setProducts = createAction<PlantInterface[]>('SET_PRODUCTS')
export const setProduct = createAction<PlantInterface>('SET_PRODUCT')
export const deleteProduct = createAction<string>('DELETE_PRODUCT')

export const setFilters = createAction<FiltersInterface | null>('SET_FILTERS')
export const setCartProducts = createAction<PlantInterface[]>('SET_CART_PRODUCTS')

export const setAppliedFilters = createAction<FiltersInterface | null>('SET_APPLIED_FILTERS')

export const setProductFormError = createAction<string | null>('SET_PRODUCT_FORM_ERROR')