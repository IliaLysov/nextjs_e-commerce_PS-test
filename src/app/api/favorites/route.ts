import { NextRequest, NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'
import { options } from "../auth/[...nextauth]/options"
import { Types } from "mongoose"

import dbConnect from "@/lib/dbConnect"
import FavoritesSchema from '@/schemas/favorites'
import FavoriteDto from '@/dtos/favorites-dto'

export async function POST(request: Request) {
    try {
        const productId = await request.json()
        const session: any = await getServerSession(options)
        await dbConnect()

        const document = await FavoritesSchema.findOne({userId: new Types.ObjectId(session.user.id), productId: new Types.ObjectId(productId)})
        if (document) {
            throw new Error('Данный товар уже у вас в корзине')
        }

        const response = await FavoritesSchema.create({userId: new Types.ObjectId(session.user.id), productId: new Types.ObjectId(productId)})
        const cartDto = new FavoriteDto(response)
        return NextResponse.json(cartDto)
    } catch (e: any) {
        console.log(e)
    }
}

export async function DELETE(request: Request) {
    try {
        const favoritesId = await request.json()
        // const session: any = await getServerSession(options)
        await dbConnect()
        const response = await FavoritesSchema.deleteOne({_id: new Types.ObjectId(favoritesId)})
        return NextResponse.json(response)
    } catch (e: any) {
        console.log(e)
    }
}