import { FiltersInterface } from '@/types/filter'
import {createAction} from '@reduxjs/toolkit'


export const getCatalogProducts = createAction<{skip: number, appliedFilters: FiltersInterface | null, sort: any}>('GET_CATALOG_PRODUCTS')
export const getMoreCatalogProducts = createAction<{skip: number, appliedFilters: FiltersInterface | null, sort: any}>('GET_MORE_CATALOG_PRODUCTS')