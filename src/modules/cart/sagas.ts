import {call, takeEvery, put, select} from 'redux-saga/effects'
import { addToCartPost, removeFromCartPost, getCartItems, changeCartCountPost, getMoreCartItems, getOrderData } from './sagaActions'
import { CartDBItemInterface, CartInfoInterface, CartItemInterface, OrderItemInterface } from '@/types/cart'
import { addToCart, changeCartCount, removeFromCart, setCartItems, setMoreCartItems, setOrderItems } from './actions'
import CartService from '@/services/cart'
import { PlantInterface, PlantOwnerTypeEnum } from '@/types/product'
import { cartProductsGet, deleteProduct, filtersSelector, setAppliedFilters } from '..'
import PlantsService from '@/services/plants'

function* addToCartPostSaga(action: ReturnType<typeof addToCartPost>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
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
        process.env.NODE_ENV === 'development' && console.log(action)
        const {cartId, productId} = action.payload
        if (cartId) {
            yield call(CartService.remove, cartId)
            yield put(removeFromCart(productId))
        }
    } catch(e: any) {
        console.log(e)
    }
}

function* changeCartCountPostSaga(action: ReturnType<typeof changeCartCountPost>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
        yield call(CartService.count, action.payload)
        yield put(changeCartCount(action.payload))
    } catch(e: any) {
        console.log(e)
    }
}

function* getCartItemsSaga(action: ReturnType<typeof getCartItems>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
        const {skip, ids}: {skip: number, ids: string[]} = action.payload
        const products: any = yield call(PlantsService.getSome, {skip, ids})
        yield put(setCartItems(products as PlantInterface[]))
    } catch(e: any) {
        console.log(e)
    }
}

function* getMoreCartItemsSaga(action: ReturnType<typeof getMoreCartItems>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
        const {skip, ids}: {skip: number, ids: string[]} = action.payload
        const products: any = yield call(PlantsService.getSome, {skip, ids})
        yield put(setMoreCartItems(products as PlantInterface[]))
    } catch(e: any) {
        console.log(e)
    }
}

function* getOrderDataSaga(action: ReturnType<typeof getOrderData>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
        const products: any = yield call(CartService.getOrder)
        yield put(setOrderItems(products as OrderItemInterface[]))
    } catch(e: any) {
        console.log(e)
    }
}


export function* cartSaga() {
    yield takeEvery(addToCartPost.type, addToCartPostSaga)
    yield takeEvery(removeFromCartPost.type, removeFromCartPostSaga)
    yield takeEvery(changeCartCountPost.type, changeCartCountPostSaga)
    yield takeEvery(getCartItems.type, getCartItemsSaga)
    yield takeEvery(getMoreCartItems.type, getMoreCartItemsSaga)
    yield takeEvery(getOrderData.type, getOrderDataSaga)
}