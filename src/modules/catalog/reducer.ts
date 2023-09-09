import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { PlantInterface } from '@/types/product'
import { setCatalogAppliedFilters, setCatalogFilters, setCatalogItems, setMoreCatalogItems } from '.'
import { RootState } from '@/app/store'
import { FiltersInterface } from '@/types/filter'


const catalogItems = createReducer<PlantInterface[] | null>(null, (builder) => {
    builder
        .addCase(setCatalogItems, (state, {payload}) => payload)
        .addCase(setMoreCatalogItems, (state, {payload}) => state && [...state, ...payload])
})

const catalogFilters = createReducer<FiltersInterface | null>(null, (builder) => {
    builder.addCase(setCatalogFilters, (state, {payload}) => payload)
})

const catalogAppliedFilters = createReducer<FiltersInterface | null>(null, (builder) => {
    builder.addCase(setCatalogAppliedFilters, (state, {payload}) => payload)
})

export default combineReducers({
    catalogItems,
    catalogFilters,
    catalogAppliedFilters
})

const catalogItemsSelector = (state: RootState) => state.rootReducer.catalog.catalogItems
const catalogFiltersSelector = (state: RootState) => state.rootReducer.catalog.catalogFilters
const catalogAppliedFiltersSelector = (state: RootState) => state.rootReducer.catalog.catalogAppliedFilters

export {catalogItemsSelector, catalogFiltersSelector, catalogAppliedFiltersSelector}