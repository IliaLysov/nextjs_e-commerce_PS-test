import { CartDBItemInterface } from "@/types/cart"
import { CompanyInterface } from "@/types/company"
import { FavoritesDBItemInterface } from "@/types/favorites"
import NextAuth from "next-auth/next"

declare module "next-auth" {
    
    interface Session {
        user: {
            id: string,
            name: string,
            email: string,
            image: string
        },
        company: CompanyInterface | null,
        cart: CartDBItemInterface[] | null,
        favorites: FavoritesDBItemInterface[] | null
    }
}