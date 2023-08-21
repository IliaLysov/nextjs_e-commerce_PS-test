import { call, takeEvery, put, select } from 'redux-saga/effects'
import { addOnePlantPost, setProductFormError, ownProductsGet, setProducts, setFilters, setAppliedFilters, allProductsGet, favoritesProductsGet, cartProductsGet } from '.'
import PlantsService from '@/services/plants'
import { PlantFormInterface, PlantInterface } from '@/types/product'
import { cartSelector, favoritesSelector, setModal } from '..'
import { FiltersInterface } from '@/types/filter'
import { FavoritesDBItemInterface } from '@/types/favorites'
import { CartDBItemInterface } from '@/types/cart'

function* addOnePlantPostSaga(action: ReturnType<typeof addOnePlantPost>): Generator {
    try {
        const plantInfo: any = action.payload
        const formData: any = new FormData()

        for (const property in plantInfo) {
            const type = typeof plantInfo[property]
            if (property === 'images') {
                for (let i = 0; i < plantInfo.images.length; i++) {formData.append('images', plantInfo.images[i])}
            } else if (type === 'number' || type === 'string') {
                plantInfo[property] && formData.append(property, plantInfo[property])
            } else if (type === 'object' && !Array.isArray(plantInfo[property])) {
                plantInfo[property]?.value && formData.append(property, plantInfo[property].value)
            } else if (Array.isArray(plantInfo[property])) {
                plantInfo[property].forEach((element: any) => element?.value && formData.append(property, element.value))
            }
        }

        // for (const [key, value] of formData.entries()) {
        //     console.log(key, value)
        // }

        const response: any = yield call(PlantsService.addOne, formData)
        if (response.error) {
            yield put(setProductFormError(response.error))
        } else {
            yield put(setModal(null))
        }
    } catch (e: any) {
        console.log(e)
    }
}

function* ownProductsGetSaga(action: ReturnType<typeof ownProductsGet>): Generator {
    try {
        const {skip, appliedFilters, sort, organizationId} = action.payload
        const response: any = yield call(PlantsService.getOwn, {params: {skip, appliedFilters, sort}, organizationId})
        const plants: PlantInterface[] = response.products
        const filters: FiltersInterface = response.filters
        yield put(setProducts(plants))
        yield put(setFilters(filters))
        if (appliedFilters) {
            yield put(setAppliedFilters(appliedFilters))
        }
    } catch (e: any) {
        console.log('product ownProductsGetSaga', e)
    }
}

function* allProductsGetSaga(action: ReturnType<typeof ownProductsGet>): Generator {
    try {
        const {skip, appliedFilters, sort} = action.payload
        const response: any = yield call(PlantsService.getAll, action.payload)
        const plants: PlantInterface[] = response.products
        const filters: FiltersInterface = response.filters
        yield put(setProducts(plants))
        yield put(setFilters(filters))
        if (appliedFilters) {
            yield put(setAppliedFilters(appliedFilters))
        }
    } catch (e: any) {
        console.log('product allProductsGetSaga', e)
    }
}

function* favoritesProductsGetSaga(action: ReturnType<typeof ownProductsGet>): Generator {
    try {
        const {skip, appliedFilters, sort} = action.payload
        const favorites: any = yield select(favoritesSelector)
        const args: {skip: number, appliedFilters: FiltersInterface | null, sort: any} = {skip, appliedFilters: {...appliedFilters, id: favorites.map((obj: FavoritesDBItemInterface) => obj.productId)}, sort}
        const response: any = yield call(PlantsService.getAll, args)
        const plants: PlantInterface[] = response.products
        const filters: FiltersInterface = response.filters
        yield put(setProducts(plants))
        yield put(setFilters(filters))
        if (appliedFilters) {
            yield put(setAppliedFilters(appliedFilters))
        }
    } catch (e: any) {
        console.log('product allProductsGetSaga', e)
    }
}

function* cartProductsGetSaga(action: ReturnType<typeof ownProductsGet>): Generator {
    try {
        const {skip, appliedFilters, sort} = action.payload
        const cart: any = yield select(cartSelector)
        const args: {skip: number, appliedFilters: FiltersInterface | null, sort: any} = {skip, appliedFilters: {...appliedFilters, id: cart.map((obj: CartDBItemInterface) => obj.productId)}, sort}
        const response: any = yield call(PlantsService.getAll, args)
        const plants: PlantInterface[] = response.products
        const filters: FiltersInterface = response.filters
        yield put(setProducts(plants))
        yield put(setFilters(filters))
        if (appliedFilters) {
            yield put(setAppliedFilters(appliedFilters))
        }
    } catch (e: any) {
        console.log('product allProductsGetSaga', e)
    }
}

export function* productSaga() {
    yield takeEvery(addOnePlantPost.type, addOnePlantPostSaga)
    yield takeEvery(ownProductsGet.type, ownProductsGetSaga)
    yield takeEvery(allProductsGet.type, allProductsGetSaga)
    yield takeEvery(favoritesProductsGet.type, favoritesProductsGetSaga)
    yield takeEvery(cartProductsGet.type, cartProductsGetSaga)
}