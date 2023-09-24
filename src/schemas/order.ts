import { Schema, model, Types, models } from "mongoose";

const OrderSchema = new Schema({
    userId: {type: Types.ObjectId, ref: 'User', required: true},
    userName: {type: String, required: true},
    companyId: {type: Types.ObjectId, ref: 'Company', required: true},
    companyName: {type: String, required: true},
    products: [{
        productId: {type: Types.ObjectId, ref: 'Product', required: true},
        name: {type: String, required: true},
        latinName: {type: String, required: true},
        price: {type: Number, required: true},
        count: {type: Number, required: true}
    }],
    totalPrice: {type: Number, required: true},
    address: {type: String},
    phone: {type: String},
    whatsapp: {type: String},
    telegram: {type: String},
    email: {type: String},
    status: {type: String, default: 'pending', required: true},
    createdAt: {type: Date, default: Date.now, required: true},
})

export default models.Order || model('Order', OrderSchema)