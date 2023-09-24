import { NextRequest, NextResponse } from 'next/server'

import { getServerSession } from 'next-auth/next'
import { options } from "@/app/api/auth/[...nextauth]/options"
import { Types } from "mongoose"

import PlantSchema from '@/schemas/plant'
import OrderSchema from '@/schemas/order'
import CartSchema from '@/schemas/cart'
import TChatSchema from '@/schemas/tchat'
import dbConnect from "@/lib/dbConnect"
import { CartDBItemInterface, OrderItemInterface } from '@/types/cart'
import OrderItemDto from '@/dtos/order-dto'
import { OrderInterface } from '@/types/order'

import TelegramBot from 'node-telegram-bot-api';

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

        const companies = [...new Set(products.map((item: OrderItemInterface) => item.companyId))]
        
        const orders: OrderInterface[] = companies.map((companyId: string) => {
            const companyProducts = products.filter((item: OrderItemInterface) => item.companyId.toString() === companyId)
            const companyName = companyProducts[0].companyName
            const totalPrice = companyProducts.reduce((acc: number, item: OrderItemInterface) => acc + item.price, 0)
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

        //----------------------------------------------

        //make fetch to bot server

        // if (process.env.TELEGRAM_BOT_TOKEN) {
        //     const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN || '', { polling: false });

        //     const companiesIds = orders.map((item: OrderInterface) => item.companyId)
        //     const tchats = await TChatSchema.find({companyId: {$in: companiesIds}})
    
        //     tchats.forEach(async (tchat: any) => {
        //         if (orders.filter(({companyId}) => companyId.toString() === tchat.companyId.toString()).length === 1) {
        //             const message = orders.reduce((acc: string, item: OrderInterface) => {
        //                 if (item.companyId.toString() === tchat.companyId.toString()) {
        //                     const products = item.products.reduce((acc: string, item) => {
        //                         return acc + `${item.name} (${item.count}) - ${item.price} руб.\n`
        //                     }, '')
        //                     return acc + `От: ${session.user.name}\nEmail: ${session.user.email}\nАдрес: ${item.address}\nТелефон: ${item.phone}\nWhatsapp: ${item.whatsapp}\nTelegram: ${item.telegram}\n\n${products}\n\n`
        //                 }
        //                 return acc
        //             }, '')
        //             bot.sendMessage(tchat.chatId, message);
        //         }
        //     })
        // }


        //----------------------------------------------

        return NextResponse.json({message: 'success'})
    } catch (e: any) {
        console.log(e)
    }
}