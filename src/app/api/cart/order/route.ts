import { NextRequest, NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"
import { Types } from "mongoose"

import PlantSchema from '@/schemas/plant'
import OrderSchema from '@/schemas/order'
import CartSchema from '@/schemas/cart'
import dbConnect from "@/lib/dbConnect"
import { CartDBItemInterface, OrderItemInterface } from '@/types/cart'
import OrderItemDto from '@/dtos/order-dto'
import { OrderInterface } from '@/types/order'

export async function POST(request: Request) {
    try {
        const session: any = await getServerSession(options)
        await dbConnect()

        const projection = {
            _id: 1,
            name: 1,
            latinName: 1,
            price: 1,
            companyId: 1,
            companyInfo: 1,
        }

        const idsArray: Types.ObjectId[] = session.cart.map((item: CartDBItemInterface) => new Types.ObjectId(item.productId))
        const response = await PlantSchema.find({_id: {$in: idsArray}}, projection)

        const products: OrderItemInterface[] = response.map((item: any) => {
            const cartItem = session.cart.find((cartI: CartDBItemInterface) => cartI.productId.toString() === item._id.toString())
            return new OrderItemDto({...item._doc, ...cartItem})
        })

        return NextResponse.json(products)
    } catch (e: any) {
        console.log(e)
    }
}

export async function PUT(request: Request) {
    try {
        const session: any = await getServerSession(options)
        await dbConnect()

        const {address, phone, whatsapp, telegram} = await request.json()

        const projection = {
            _id: 1,
            name: 1,
            latinName: 1,
            price: 1,
            companyId: 1,
            companyInfo: 1,
        }

        const idsArray: Types.ObjectId[] = session.cart.map((item: CartDBItemInterface) => new Types.ObjectId(item.productId))
        const response = await PlantSchema.find({_id: {$in: idsArray}}, projection)

        const products: OrderItemInterface[] = response.map((item: any) => {
            const cartItem = session.cart.find((cartI: CartDBItemInterface) => cartI.productId.toString() === item._id.toString())
            return new OrderItemDto({...item._doc, ...cartItem})
        })

        const totalPrice = products.reduce((acc: number, item: OrderItemInterface) => acc + item.price, 0)

        const companies = [...new Set(products.map((item: OrderItemInterface) => item.companyId))]
        
        const orders: OrderInterface[] = companies.map((companyId: string) => {
            const companyProducts = products.filter((item: OrderItemInterface) => item.companyId.toString() === companyId)
            const companyName = companyProducts[0].companyName
            return new OrderSchema({
                userId: session.user.id,
                userName: session.user.name,
                companyId,
                companyName,
                products: companyProducts,
                totalPrice,
                address,
                phone,
                whatsapp,
                telegram,
                email: session.user.email,
                status: 'pending'
            })
        })

        await OrderSchema.insertMany(orders)

        const ids = session.cart.map((item: CartDBItemInterface) => item.cartId)
        await CartSchema.deleteMany({_id: {$in: ids}})

        return NextResponse.json({message: 'success'})
    } catch (e: any) {
        console.log(e)
    }
}