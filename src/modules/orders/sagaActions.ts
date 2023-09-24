import { createAction } from '@reduxjs/toolkit'

export const getCustomerOrders = createAction<string>('GET_CUSTOMER_ORDERS')
export const getMoreCustomerOrders = createAction<{status: string, skip: number}>('GET_MORE_CUSTOMER_ORDERS')

