import { NextRequest, NextResponse } from 'next/server'
import dbConnect from "@/lib/dbConnect"
import OrderSchema from '@/schemas/order'
import { OrderInterface } from '@/types/order'
import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"
import { Types } from "mongoose"

export async function POST(request: Request) {
    try {
        const session: any = await getServerSession(options)
        await dbConnect()

        const {status, skip, refreshTotal} = await request.json()

        const orders: OrderInterface[] = await OrderSchema.find({userId: session.user.id, status}, null, {skip, limit: 20}).sort({createdAt: -1})

        let total: number = 0

        if (refreshTotal) {
            total = await OrderSchema.countDocuments({userId: session.user.id, status})
        }
        return NextResponse.json({orders, total})
    } catch (e: any) {
        console.log(e)
    }
}