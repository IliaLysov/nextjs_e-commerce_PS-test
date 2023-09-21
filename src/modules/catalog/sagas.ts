import {call, takeEvery, put, select} from 'redux-saga/effects'
import { getCatalogProducts, getMoreCatalogProducts, setCatalogAppliedFilters, setCatalogFilters, setCatalogItems, setMoreCatalogItems } from '.'
import CatalogService from '@/services/catalog'
import { PlantInterface } from '@/types/product'
import { FiltersInterface } from '@/types/filter'

function* getCatalogProductsSaga(action: ReturnType<typeof getCatalogProducts>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
        const response: any = yield call(CatalogService.getAll, action.payload)
        yield put(setCatalogItems(response.products as PlantInterface[]))
        yield put(setCatalogFilters(response.filters as FiltersInterface))
        yield put(setCatalogAppliedFilters(response.newAppliedFilters as FiltersInterface))
    } catch(e: any) {
        console.log(e)
    }
}

function* getMoreCatalogProductsSaga(action: ReturnType<typeof getMoreCatalogProducts>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
        const response: any = yield call(CatalogService.getAll, action.payload)
        yield put(setMoreCatalogItems(response.products as PlantInterface[]))
    } catch(e: any) {
        console.log(e)
    }
}


export function* catalogSaga() {
    yield takeEvery(getCatalogProducts.type, getCatalogProductsSaga)
    yield takeEvery(getMoreCatalogProducts.type, getMoreCatalogProductsSaga)
}