import { NextResponse } from "next/server"
import PlantSchema from '@/schemas/plant'
import dbConnect from "@/lib/dbConnect"
import { Types } from "mongoose"



export async function POST(request: Request) {
    try {
        await dbConnect()
        const {skip, appliedFilters, sort} = await request.json()
        const filter = []

        if (appliedFilters) {
            appliedFilters?.price && filter.push({price: {$gte: appliedFilters.price.min, $lte: appliedFilters.price.max}})
            appliedFilters?.id && filter.push({_id: {$in: appliedFilters.id.map((id: string) => new Types.ObjectId(id))}})
        }


        const products = await PlantSchema.find(appliedFilters ? {
            $and: filter
        } : {}).limit(10).skip(skip)

        const body = [
            {
                $group: {
                    _id: null,
                    maxPrice: {$max: '$price'},
                    minPrice: {$min: '$price'},
                    count: {$sum: 1}
                }
            }
        ]

        if (appliedFilters) {
            const idFilter: any = appliedFilters?.id && {$match: {_id: {$in: appliedFilters.id.map((id: string) => new Types.ObjectId(id))}}} 
    
            appliedFilters?.id && body.unshift(idFilter)
        }

        const aggregate = await PlantSchema.aggregate(body)

        const filters = aggregate.length !== 0 ?
        {
            count: aggregate[0].count,
            price: {min: aggregate[0].minPrice, max: aggregate[0].maxPrice}
        } : null


        const newAppliedFilters = aggregate.length !== 0 ? {
            count: aggregate[0].count,
            price: appliedFilters?.price ? {min: aggregate[0].minPrice > appliedFilters.price.min ? aggregate[0].minPrice : appliedFilters.price.min, max: aggregate[0].maxPrice < appliedFilters.price.max ? aggregate[0].maxPrice : appliedFilters.price.max} : {min: aggregate[0].minPrice, max: aggregate[0].maxPrice}
        } : null


        return NextResponse.json({products, filters, newAppliedFilters})
    } catch (error: any) {
        console.log(error)
        return NextResponse.json(error)
    }
}