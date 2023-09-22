export interface OrderInterface {
    userId: string,
    userName: string,
    companyId: string,
    companyName: string,
    products: {
        productId: string,
        name: string,
        latinName: string,
        price: number,
        count: number
    }[],
    totalPrice: number,
    address: string,
    phone: string,
    whatsapp: string,
    telegram: string,
    email: string,
    status: string
}