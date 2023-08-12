import { Schema, model, Types, models } from "mongoose";

const FavoritesSchema = new Schema({
    userId: {type: Types.ObjectId, ref: 'User'},
    productId: {type: Types.ObjectId, ref: 'Product'},
})

export default models.Favorites || model('Favorites', FavoritesSchema)