import { createAction } from "@reduxjs/toolkit";
import { OrderInterface } from "@/types/order";

export const setCustomerOrders = createAction<OrderInterface[]>('SET_CUSTOMER_ORDERS_ITEMS')
export const setMoreCustomerOrders = createAction<OrderInterface[]>('SET_CUSTOMER_MORE_ORDERS_ITEMS')

export const setTotalCustomerOrders = createAction<{status: string, total: number}>('SET_TOTAL_CUSTOMER_ORDERS')