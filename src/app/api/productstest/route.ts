import { getProducts } from "@/lib/api/products"
import { NextRequest, NextResponse } from 'next/server'


export async function GET() {
    try {
        const result = await getProducts()
        return NextResponse.json({products: result})
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {
            status: 500
        })
    }
}