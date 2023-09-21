export interface CartItemInterface {
    productId: string,
    count: number
}

export interface CartDBItemInterface {
    cartId: string,
    productId: string,
    count: number
}

export interface CartInfoInterface {
    count: number,
    price: number
}

export interface OrderItemInterface {
    cartId: string,
    productId: string,
    count: number,
    price: number,
    name: string,
    latinName: string,
    companyId: string,
    companyName: string
}