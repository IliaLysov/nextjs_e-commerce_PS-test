import {call, takeEvery, put, select} from 'redux-saga/effects'
import { addToFavoritesPost, removeFromFavoritesPost } from './sagaActions'
import { FavoritesDBItemInterface, FavoritesItemInterface } from '@/types/favorites'
import { addToFavorites, removeFromFavorites } from './actions'
import FavoritesService from '@/services/favorites'
import { PlantOwnerTypeEnum } from '@/types/product'
import { deleteProduct, favoritesProductsGet } from '..'

function* addToFavoritesPostSaga(action: ReturnType<typeof addToFavoritesPost>): Generator {
    try {
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
        const {favoriteId, productId} = action.payload.favorites
        const body = action.payload.body
        if (favoriteId) {
            yield call(FavoritesService.remove, favoriteId)
            yield put(removeFromFavorites(productId))
            if (body) {
                yield put(favoritesProductsGet(body))
            }
        }
        
    } catch(e: any) {
        console.log(e)
    }
}


export function* favoritesSaga() {
    yield takeEvery(addToFavoritesPost.type, addToFavoritesPostSaga)
    yield takeEvery(removeFromFavoritesPost.type, removeFromFavoritesPostSaga)
}