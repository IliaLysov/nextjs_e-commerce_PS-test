import { NextRequest, NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"
import { Types } from "mongoose"

import dbConnect from "@/lib/dbConnect"
import CartSchema from '@/schemas/cart'
import PlantSchema from '@/schemas/plant'
import CartDto from '@/dtos/cart-dto'
import { CartDBItemInterface } from '@/types/cart'


export async function POST(request: Request) {
    try {
        const {skip, ids}: {skip: number, ids: string[]} = await request.json()
        // const session: any = await getServerSession(options)
        await dbConnect()

        // const cart: CartDBItemInterface[] = session.cart
        const idsArray: Types.ObjectId[] = ids.map((item: string) => new Types.ObjectId(item))
        // const plantsIdArray: Types.ObjectId[] = cart.map((obj: CartDBItemInterface) => new Types.ObjectId(obj.productId))

        const products = await PlantSchema.find({_id: {$in: idsArray}}).limit(10).skip(skip)

        const aggregateInfo = await PlantSchema.aggregate([
            {
                $match: {
                    _id: {
                        $in: idsArray
                    }
                }
            },
            {
                $group: {
                    _id: null,
                    price: {$sum: '$price'},
                    count: {$sum: 1}
                }
            }
        ])

        const cartInfo = aggregateInfo.length !== 0 ? {
            count: aggregateInfo[0].count,
            price: aggregateInfo[0].price
        } : null
   

        return NextResponse.json({products, cartInfo})
    } catch (e: any) {
        console.log(e)
    }
}