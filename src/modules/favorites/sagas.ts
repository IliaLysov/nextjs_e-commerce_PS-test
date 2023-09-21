import {call, takeEvery, put, select} from 'redux-saga/effects'
import { addToFavoritesPost, getFavoritesItems, removeFromFavoritesPost } from './sagaActions'
import { FavoritesDBItemInterface, FavoritesItemInterface } from '@/types/favorites'
import { addToFavorites, removeFromFavorites, setFavoritesItems } from './actions'
import FavoritesService from '@/services/favorites'
import { PlantInterface, PlantOwnerTypeEnum } from '@/types/product'
import { deleteProduct, favoritesProductsGet } from '..'
import CartService from '@/services/cart'
import PlantsService from '@/services/plants'

function* addToFavoritesPostSaga(action: ReturnType<typeof addToFavoritesPost>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
        const productId: string = action.payload
        const response: any = yield call(FavoritesService.add, productId)
        const newCartItem: FavoritesDBItemInterface = response
        yield put(addToFavorites(newCartItem))
    } catch(e: any) {
        console.log(e)
    }
}

function* removeFromFavoritesPostSaga(action: ReturnType<typeof removeFromFavoritesPost>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
        const {favoriteId, productId} = action.payload
        if (favoriteId) {
            yield call(FavoritesService.remove, favoriteId)
            yield put(removeFromFavorites(productId))
        }
        
    } catch(e: any) {
        console.log(e)
    }
}

function* getFavoritesItemsSaga(action: ReturnType<typeof getFavoritesItems>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
        const {skip, ids}: {skip: number, ids: string[]} = action.payload
        const products: any = yield call(PlantsService.getSome, {skip, ids})
        yield put(setFavoritesItems(products as PlantInterface[]))
    } catch(e: any) {
        console.log(e)
    }
}


export function* favoritesSaga() {
    yield takeEvery(addToFavoritesPost.type, addToFavoritesPostSaga)
    yield takeEvery(removeFromFavoritesPost.type, removeFromFavoritesPostSaga)
    yield takeEvery(getFavoritesItems.type, getFavoritesItemsSaga)
}