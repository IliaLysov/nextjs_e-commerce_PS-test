import {createAction} from '@reduxjs/toolkit'
import { FiltersInterface } from '@/types/filter'
import { PlantFormInterface } from '@/types/product'



export const allProductsGet = createAction<{skip: number, appliedFilters: FiltersInterface | null, sort: any}>('ALL_PRODUCT_GET')
export const ownProductsGet = createAction<{skip: number, appliedFilters: FiltersInterface | null, sort: any, organizationId: string}>('OWN_PRODUCTS_GET')
export const favoritesProductsGet = createAction<{skip: number, appliedFilters: FiltersInterface | null, sort: any}>('FAVORITES_PRODUCT_GET')
export const cartProductsGet = createAction<{skip: number, appliedFilters: FiltersInterface | null, sort: any}>('CART_PRODUCT_GET')


export const addOnePlantPost = createAction<Partial<PlantFormInterface>>('PRODUCT_POST')
export const deleteProductPost = createAction<string>('DELETE_PRODUCT_POST')
export const updateProductPost = createAction<PlantFormInterface>('UPDATE_PRODUCT_POST')