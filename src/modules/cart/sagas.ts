import {call, takeEvery, put, select} from 'redux-saga/effects'
import { addToCartPost, removeFromCartPost } from './sagaActions'
import { CartDBItemInterface, CartItemInterface } from '@/types/cart'
import { addToCart, removeFromCart } from './actions'
import CartService from '@/services/cart'

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
        const {cartId, productId} = action.payload
        if (cartId) {
            yield call(CartService.remove, cartId)
        }
        yield put(removeFromCart(productId))
    } catch(e: any) {
        console.log(e)
    }
}


export function* cartSaga() {
    yield takeEvery(addToCartPost.type, addToCartPostSaga)
    yield takeEvery(removeFromCartPost.type, removeFromCartPostSaga)
}