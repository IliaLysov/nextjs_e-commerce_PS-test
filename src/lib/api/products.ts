import clientPromise from "../mongodb"


export async function getProducts() {
    try {
        const client = await clientPromise
        const collection = client.db(process.env.DB_NAME).collection('products')
        const result = await collection.find({}).toArray()
        return result
    } catch (error: any) {
        return {error: 'Failed to fetch products', message: error}
    }
}

export async function getOneProduct(name: string) {
    try {
        const client = await clientPromise
        const collection = client.db(process.env.DB_NAME).collection('products')
        const result = await collection.find({name: name}).toArray()
        return result
    } catch (error: any) {
        return {error: 'Failed to fetch products', message: error}
    }
}