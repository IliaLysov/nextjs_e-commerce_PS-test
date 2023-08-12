import { NextResponse } from "next/server"
import { PlantInterface } from "@/types/product"

import { getServerSession } from 'next-auth/next'
import { options } from "../auth/[...nextauth]/options"
import { Types } from "mongoose"

import dbConnect from "@/lib/dbConnect"
import PlantSchema from '@/schemas/plant'
import s3 from '@/services/YC-service'
import YCUploadDto from '@/dtos/YC-upload-dto'


export async function POST(request: Request) {
    try {
        const session: any = await getServerSession(options) //работает, но с предупреждением экспериментального функионала
        await dbConnect()

        const formData: any = await request.formData()

        let plant: Partial<PlantInterface> = {}

        type PlantImage = PlantInterface['images']
        let plantImages: PlantImage = []

        const images = formData.getAll('images')
        formData.delete('images')
        for (let i = 0; i < images.length; i++) {
            const image = images[i] as Blob | null
            if (image) {
                const buffer = Buffer.from(await image?.arrayBuffer())
                const imageInfo = await s3.Upload({buffer: buffer}, '/plantsImages/')
                const imageDto = new YCUploadDto(imageInfo)
                plantImages.push(imageDto)
            }
        }

        for (const [key, value] of formData.entries()) {
            plant[key as keyof PlantInterface] = value
        }
        plant.images = plantImages
        plant.authorId = new Types.ObjectId(session.user.id)
        plant.companyId = new Types.ObjectId(session.company._id)
        plant.companyInfo = {
            latinName: session.company.latinName,
            logo: session.company.logo.location
        }
        // console.log(plant)
        const result = await PlantSchema.create(plant)
        
        return NextResponse.json(result)

    } catch (error: any) {
        return NextResponse.json(error)
    }
}