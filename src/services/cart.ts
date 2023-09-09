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

    static async update(cartInfo: {cartId: string, count: number}) {

    }
}