import { Schema, model, Types, models } from "mongoose";

const CartSchema = new Schema({
    userId: {type: Types.ObjectId, ref: 'User'},
    productId: {type: Types.ObjectId, ref: 'Product'},
    count: {type: Number}
})

export default models.Cart || model('Cart', CartSchema)