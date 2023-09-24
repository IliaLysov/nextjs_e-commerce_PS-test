import {call, takeEvery, put, select} from 'redux-saga/effects'
import { getCustomerOrders, getMoreCustomerOrders } from './sagaActions'
import { OrderInterface, OrderStatusType } from '@/types/order'
import OrdersService from '@/services/orders'
import { setCustomerOrders, setMoreCustomerOrders, setTotalCustomerOrders } from '.'


function* getCustomerOrdersSaga(action: ReturnType<typeof getCustomerOrders>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
        const status = action.payload as string
        const {orders, total}: any = yield call(OrdersService.getCustomerOrders, {status, skip: 0})
        yield put(setCustomerOrders(orders as OrderInterface[]))
        yield put(setTotalCustomerOrders({status, total}))
    } catch(e: any) {
        console.log(e)
    }
}

function* getMoreCustomerOrdersSaga(action: ReturnType<typeof getMoreCustomerOrders>): Generator {
    try {
        process.env.NODE_ENV === 'development' && console.log(action)
        const {status, skip}: {status: OrderStatusType, skip: number} = action.payload
        const {orders}: any = yield call(OrdersService.getCustomerOrders, {status, skip, refreshTotal: false})
        yield put(setMoreCustomerOrders(orders as OrderInterface[]))
    } catch(e: any) {
        console.log(e)
    }
}

export function* ordersSaga() {
    yield takeEvery(getCustomerOrders.type, getCustomerOrdersSaga)
    yield takeEvery(getMoreCustomerOrders.type, getMoreCustomerOrdersSaga)
}