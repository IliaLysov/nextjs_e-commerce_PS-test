import type {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import YandexProvider from "next-auth/providers/yandex"
import Email from 'next-auth/providers/email'

import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/clientPromise'

import dbConnect from "@/lib/dbConnect"
import CompanySchema from "@/schemas/company"
import CartSchema from '@/schemas/cart'
import FavoritesSchema from '@/schemas/favorites'
import { Types } from "mongoose"
import CartDto from '@/dtos/cart-dto'
import FavoriteDto from '@/dtos/favorites-dto'

export const options: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise, {databaseName: process.env.DB_NAME}),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        YandexProvider({
            clientId: process.env.YANDEX_CLIENT_ID as string,
            clientSecret: process.env.YANDEX_CLIENT_SECRET as string
        }),
        Email({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD
                }
            },
            from: process.env.EMAIL_FROM
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt(info) {
            // console.log('jwt callback', info)
            const { token, account, user } = info
            if (account) {
              token.accessToken = account.access_token;
              token.userId = user.id;
              //token.role = add role
            }
            return token;
          },
        async session(info) {
            // console.log('session callback', info)
            const {session, token} = info
            //user from mongodb
            await dbConnect()
            const userId = new Types.ObjectId(token.userId as string)
            const company = await CompanySchema.findOne({authorId: userId})
            session.company = company
            const cart = await CartSchema.find({userId})
            const cartDto = cart.map(obj => new CartDto(obj))
            session.cart = cartDto
            const favorites = await FavoritesSchema.find({userId})
            const favoritesDto = favorites.map(obj => new FavoriteDto(obj))
            session.favorites = favoritesDto

            session.user.id = token.userId as string
            return session
        }
    }
}