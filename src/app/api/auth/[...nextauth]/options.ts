import type {NextAuthOptions} from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import YandexProvider from "next-auth/providers/yandex"
import Email from 'next-auth/providers/email'

import { MongoDBAdapter } from '@next-auth/mongodb-adapter'
import clientPromise from '@/lib/mongodb'

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
    callbacks: {
        async session({session, user}) {
            session.user.id = user.id
            return session
        }
    }
}