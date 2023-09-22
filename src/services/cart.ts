import { CartDBItemInterface, CartItemInterface } from "@/types/cart";

export default class CartService {
    static async add(cartInfo: CartItemInterface) {
        const response = await fetch('/api/cart', {
            headers: {"Content-Type": "application/json"},
            method: 'POST',
            body: JSON.stringify(cartInfo)
        })
        return await response.json()
    }

    static async remove(cartId: string) {
        const response = await fetch('/api/cart', {
            headers: {"Content-Type": "application/json"},
            method: 'DELETE',
            body: JSON.stringify(cartId)
        })
        return await response.json()
    }

    static async count(data: CartDBItemInterface) {
        const response = await fetch('/api/cart', {
            headers: {"Content-Type": "application/json"},
            method: 'PATCH',
            body: JSON.stringify(data)
        })
        return await response.json()
    }

    static async getOrder() {
        const response = await fetch('/api/cart/order', {
            method: 'POST'
        })
        return await response.json()
    }

    static async sendOrder(data: {
        address: string | null,
        phone: string | null,
        whatsapp: string | null,
        telegram: string | null
    }) {
        const response = await fetch('/api/cart/order', {
            headers: {"Content-Type": "application/json"},
            method: 'PUT',
            body: JSON.stringify(data)
        })
        return await response.json()
    }

    // static async update(cartInfo: {cartId: string, count: number}) {

    // }
}