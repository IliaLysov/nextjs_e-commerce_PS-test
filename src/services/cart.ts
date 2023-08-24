import { CartItemInterface } from "@/types/cart";

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

    static async getItems({skip, ids}: {skip: number, ids: string[] | null}) {
        console.log('getItems skip, ids', skip, ids)
        const response = await fetch('/api/cart/products', {
            headers: {"Content-Type": "application/json"},
            method: 'POST',
            body: JSON.stringify({skip, ids})
        })
        return await response.json()
    }

    static async update(cartInfo: {cartId: string, count: number}) {

    }
}