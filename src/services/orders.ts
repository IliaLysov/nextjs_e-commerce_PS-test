import { OrderStatusType } from "@/types/order"

export default class OrdersService {
    static async getCustomerOrders({status, skip, refreshTotal=true}: {status: OrderStatusType, skip: number, refreshTotal?: boolean}) {
        const response = await fetch('/api/orders', {
            headers: {"Content-Type": "application/json"},
            method: 'POST',
            body: JSON.stringify({status, skip, refreshTotal})
        })
        return await response.json()
    }
}