import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { RootState } from '@/app/store'
import { OrderInterface, OrderStatusEnum, OrderStatusType } from '@/types/order'
import { setCustomerOrders, setMoreCustomerOrders, setTotalCustomerOrders } from './actions'


const CustomerOrders = createReducer<{[key: string]: OrderInterface[]}>(
    {
        [OrderStatusEnum.pending]: [],
        [OrderStatusEnum.rejected]: [],
        [OrderStatusEnum.resolved]: [],
        [OrderStatusEnum.faked]: [],
    },
    (builder) => {
    builder
        .addCase(setCustomerOrders, (state, {payload}) => {
            if (payload[0]) {
                const status = payload[0].status
                return {...state, [status]: payload}
            }
        })
        .addCase(setMoreCustomerOrders, (state, {payload}) => {
            if (payload[0]) {
                const status = payload[0].status
                return {...state, [status]: [...state[status], ...payload]}
            }
        })
        .addDefaultCase((state) => state)
})

const TotalCustomerOrders = createReducer<{[key: string]: number}>(
    {
        [OrderStatusEnum.pending]: 0,
        [OrderStatusEnum.rejected]: 0,
        [OrderStatusEnum.resolved]: 0,
        [OrderStatusEnum.faked]: 0,
    },
    (builder) => {
    builder
        .addCase(setTotalCustomerOrders, (state, {payload}) => {
            return {...state, [payload.status]: payload.total}
        })
        .addDefaultCase((state) => state)
})

export default combineReducers({
    CustomerOrders,
    TotalCustomerOrders,
})

const CustomerOrdersSelector = (state: RootState) => state.rootReducer.orders.CustomerOrders
const TotalCustomerOrdersSelector = (state: RootState) => state.rootReducer.orders.TotalCustomerOrders

export {
    CustomerOrdersSelector,
    TotalCustomerOrdersSelector,
}