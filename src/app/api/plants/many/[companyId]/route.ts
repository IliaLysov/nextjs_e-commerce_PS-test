import { NextResponse } from "next/server"
import PlantSchema from '@/schemas/plant'
import { Types } from "mongoose"
import dbConnect from "@/lib/dbConnect"


type Props = {
    params: {
        companyId: string
    }
}

export async function POST(request: Request, {params: { companyId }}: Props) {
    try {
        await dbConnect()
        const {skip, appliedFilters, sort} = await request.json()
        const filter = []

        appliedFilters?.price && filter.push({price: {$gte: appliedFilters.price.min, $lte: appliedFilters.price.max}})

        const products = await PlantSchema.find(appliedFilters ? {
            companyId: new Types.ObjectId(companyId),
            $and: filter
        } : {companyId: new Types.ObjectId(companyId)}).limit(10).skip(skip)


        const body = [
            {
                $match: {
                    companyId: new Types.ObjectId(companyId)
                }
            },
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

    } catch (error: any) {
        return NextResponse.json({error: error.message}, {
            status: 500
        })
    }
}