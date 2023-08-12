export default class FavoriteDto {
    favoriteId: string
    productId: string

    constructor(model: any) {
        this.favoriteId = model._id
        this.productId = model.productId
    }
}