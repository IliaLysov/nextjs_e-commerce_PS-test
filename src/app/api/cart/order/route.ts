import { NextRequest, NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"
import { Types } from "mongoose"

import PlantSchema from '@/schemas/plant'
import dbConnect from "@/lib/dbConnect"
import { CartDBItemInterface, OrderItemInterface } from '@/types/cart'
import OrderItemDto from '@/dtos/order-dto'

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