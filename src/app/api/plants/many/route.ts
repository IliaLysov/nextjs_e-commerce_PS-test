import { NextResponse } from "next/server"
import PlantSchema from '@/schemas/plant'
import dbConnect from "@/lib/dbConnect"
import { Types } from "mongoose"



export async function POST(request: Request) {
    try {
        await dbConnect()
        const {skip, appliedFilters, sort} = await request.json()
        const filter = []


        appliedFilters?.price && filter.push({price: {$gte: appliedFilters.price.min, $lte: appliedFilters.price.max}})
        appliedFilters?.id && filter.push({_id: {$in: appliedFilters.id.map((id: string) => new Types.ObjectId(id))}})

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

        const idFilter: any = appliedFilters?.id && {$match: {_id: {$in: appliedFilters.id.map((id: string) => new Types.ObjectId(id))}}} 

        appliedFilters?.id && body.unshift(idFilter)

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
        console.log(error)
        return NextResponse.json(error)
    }
}