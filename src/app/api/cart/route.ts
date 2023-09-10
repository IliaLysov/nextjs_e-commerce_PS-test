import { NextRequest, NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"
import { Types } from "mongoose"

import dbConnect from "@/lib/dbConnect"
import CartSchema from '@/schemas/cart'
import CartDto from '@/dtos/cart-dto'

export async function PATCH(request: Request) {
    try {
        const body = await request.json()
        const {count, cartId} = body
        const session: any = await getServerSession(options)
        await dbConnect()

        const response = await CartSchema.updateOne({userId: new Types.ObjectId(session.user.id), _id: new Types.ObjectId(cartId)}, {count})
        
        return NextResponse.json(response)
    } catch (e: any) {
        console.log(e)
    }
}

export async function POST(request: Request) {
    try {
        const {productId, count} = await request.json()
        const session: any = await getServerSession(options)
        await dbConnect()

        const document = await CartSchema.findOne({userId: new Types.ObjectId(session.user.id), productId: productId})
        if (document) {
            throw new Error('Данный товар уже у вас в корзине')
        }

        const response = await CartSchema.create({userId: new Types.ObjectId(session.user.id), productId, count})
        const cartDto = new CartDto(response)
        return NextResponse.json(cartDto)
    } catch (e: any) {
        console.log(e)
    }
}

export async function DELETE(request: Request) {
    try {
        const cartId = await request.json()
        // const session: any = await getServerSession(options)
        await dbConnect()
        const response = await CartSchema.deleteOne({_id: new Types.ObjectId(cartId)})
        return NextResponse.json(response)
    } catch (e: any) {
        console.log(e)
    }
}

export async function PUT(request: Request) {
    try {
        // const cartId = await request.json()
        // const session: any = await getServerSession(options)
        // await dbConnect()
        // const response = await CartSchema.deleteOne({_id: new Types.ObjectId(cartId)})
        // return NextResponse.json(response)
    } catch (e: any) {
        console.log(e)
    }
}

