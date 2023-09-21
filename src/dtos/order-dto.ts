import { CartDBItemInterface } from "@/types/cart"
import { PlantInterface } from "@/types/product"
import { Types } from "mongoose"

export default class OrderItemDto {
    cartId: string
    productId: string
    count: number
    price: number
    name: string
    latinName: string
    companyId: string
    companyName: string

    constructor(model: PlantInterface & CartDBItemInterface) {
        this.cartId = model.cartId.toString()
        this.productId = model.productId.toString()
        this.count = model.count
        this.price = model.price * model.count
        this.name = model.name
        this.latinName = model.latinName
        this.companyId = model.companyId.toString()
        this.companyName = model.companyInfo.latinName
    }
}