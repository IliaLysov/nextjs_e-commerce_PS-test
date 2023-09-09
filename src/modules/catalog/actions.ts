import { createAction } from '@reduxjs/toolkit'
import { PlantInterface } from '@/types/product'
import { FiltersInterface } from '@/types/filter'


export const setCatalogItems = createAction<PlantInterface[]>('SET_CATALOG_ITEMS')
export const setMoreCatalogItems = createAction<PlantInterface[]>('SET_MORE_CATALOG_ITEMS')

export const setCatalogFilters = createAction<FiltersInterface | null>('SET_CATALOG_FILTERS')
export const setCatalogAppliedFilters = createAction<FiltersInterface | null>('SET_CATALOG_APPLIED_FILTERS')