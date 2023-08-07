import { getOneProduct } from "@/lib/api/products"
import { NextRequest, NextResponse } from 'next/server'

type Props = {
    params: {
        id: string
    }
}

export async function GET(request: Request, {params: { id }}: Props) {
    try {
        console.log(id)
        const result = await getOneProduct(id)
        return NextResponse.json({products: result})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {
            status: 500
        })
    }
}