import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setFilters, setAppliedFilters, setProducts, setProductFormError, deleteProduct } from './actions'
import { RootState } from '@/app/store'
import { FiltersInterface } from '@/types/filter'
import { PlantInterface } from '@/types/product'

const products = createReducer(<PlantInterface[]>[], (builder) => {
    builder.addCase(setProducts, (state, {payload}) => payload)
    builder.addCase(deleteProduct, (state, {payload}) => {return state.filter((obj: any) => obj._id !== payload)})
})

const filters = createReducer(<FiltersInterface | null>null, (builder) => {
    builder.addCase(setFilters, (state, {payload}) => payload)
})

const appliedFilters = createReducer(<FiltersInterface | null>null, (builder) => {
    builder.addCase(setAppliedFilters, (state, {payload}) => payload)
})

const productFormError = createReducer(<string | null>null, (builder) => {
    builder.addCase(setProductFormError, (state, {payload}) => payload)
})

export default combineReducers({
    products,
    filters,
    appliedFilters,
    productFormError
})


const productsSelector = (state: RootState) => state.rootReducer.product.products
const filtersSelector = (state: RootState) => state.rootReducer.product.filters
const appliedFiltersSelector = (state: RootState) => state.rootReducer.product.appliedFilters
const productFormErrorSelector = (state: RootState) => state.rootReducer.product.productFormError

export {productsSelector, filtersSelector, appliedFiltersSelector, productFormErrorSelector}