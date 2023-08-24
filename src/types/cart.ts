export interface CartItemInterface {
    productId: string,
    count: number
}

export interface CartDBItemInterface {
    cartId?: string,
    productId: string,
    count: number
}

export interface CartInfoInterface {
    count: number,
    price: number
}