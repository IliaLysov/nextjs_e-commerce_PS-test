import {call, takeEvery, put, select} from 'redux-saga/effects'
import { addToCartPost, removeFromCartPost } from './sagaActions'
import { CartDBItemInterface, CartItemInterface } from '@/types/cart'
import { addToCart, removeFromCart } from './actions'
import CartService from '@/services/cart'
import { PlantOwnerTypeEnum } from '@/types/product'
import { cartProductsGet, deleteProduct, filtersSelector, setAppliedFilters } from '..'

function* addToCartPostSaga(action: ReturnType<typeof addToCartPost>): Generator {
    try {
        const cartInfo: CartItemInterface = action.payload
        const response: any = yield call(CartService.add, cartInfo)
        const newCartItem: CartDBItemInterface = response
        yield put(addToCart(newCartItem))
    } catch(e: any) {
        console.log(e)
    }
}

function* removeFromCartPostSaga(action: ReturnType<typeof removeFromCartPost>): Generator {
    try {
        const {cartId, productId} = action.payload.cart
        const body = action.payload.body
        if (cartId) {
            yield call(CartService.remove, cartId)
            yield put(removeFromCart(productId))
            if (body) {
                yield put(cartProductsGet(body))
            }
        }
        
    } catch(e: any) {
        console.log(e)
    }
}


export function* cartSaga() {
    yield takeEvery(addToCartPost.type, addToCartPostSaga)
    yield takeEvery(removeFromCartPost.type, removeFromCartPostSaga)
}