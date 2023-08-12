import { NextResponse } from "next/server"
import PlantSchema from '@/schemas/plant'
import dbConnect from "@/lib/dbConnect"


export async function POST(request: Request) {
    try {
        await dbConnect()
        console.log('db is ready')
        const {skip, appliedFilters, sort} = await request.json()
        const filter = []

        appliedFilters?.price && filter.push({price: {$gte: appliedFilters.price.min, $lte: appliedFilters.price.max}})

        const products = await PlantSchema.find(appliedFilters ? {
            $and: filter
        } : {}).limit(10).skip(skip)
        console.log('products', products)

        const body = [
            {
                $group: {
                    _id: null,
                    maxPrice: {$max: '$price'},
                    minPrice: {$min: '$price'}
                }
            }
        ]

        const aggregate = await PlantSchema.aggregate(body)
        if (aggregate.length === 0) {
            return null
        }
        const filters = 
        {
            price: {min: aggregate[0].minPrice, max: aggregate[0].maxPrice}
        }
        if (products && filters) {
            return NextResponse.json({products, filters})
        } else if (products) {
            return NextResponse.json(products)
        } else if (filters) {
            return NextResponse.json(filters)
        }
        return NextResponse.json('something went wrong')

    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error)
    }
}