import { NextResponse } from "next/server"
import PlantSchema from '@/schemas/plant'
import dbConnect from "@/lib/dbConnect"


export async function POST(request: Request) {
    try {
        await dbConnect()
        const {skip, appliedFilters, sort} = await request.json()
        const filter = []

        appliedFilters?.price && filter.push({price: {$gte: appliedFilters.price.min, $lte: appliedFilters.price.max}})

        const products = await PlantSchema.find(appliedFilters ? {
            $and: filter
        } : {}).limit(10).skip(skip)


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

        return NextResponse.json({products, filters})

    } catch (e: any) {
        console.log(e)
    }
}