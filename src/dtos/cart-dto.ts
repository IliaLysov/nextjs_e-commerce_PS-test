export default class CartDto {
    cartId: string
    productId: string
    count: number

    constructor(model: any) {
        this.cartId = model._id
        this.productId = model.productId
        this.count = model.count
    }
}