
export default class FavoritesService {
    static async add(productId: string) {
        const response = await fetch('/api/favorites', {
            headers: {"Content-Type": "application/json"},
            method: 'POST',
            body: JSON.stringify(productId)
        })
        return await response.json()
    }

    static async remove(favoritesId: string) {
        const response = await fetch('/api/favorites', {
            headers: {"Content-Type": "application/json"},
            method: 'DELETE',
            body: JSON.stringify(favoritesId)
        })
        return await response.json()
    }
}