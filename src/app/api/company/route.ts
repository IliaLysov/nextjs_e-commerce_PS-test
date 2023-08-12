import { NextRequest, NextResponse } from 'next/server'
import { CompanyInterface } from "@/types/company"

import { getServerSession } from 'next-auth/next'
import { options } from "../auth/[...nextauth]/options"
import { Types } from "mongoose"

import dbConnect from "@/lib/dbConnect"
import CompanySchema from "@/schemas/company"
import s3 from '@/services/YC-service'
import YCUploadDto from '@/dtos/YC-upload-dto'

export async function POST(request: Request, response: Response) {
    try {
        const session: any = await getServerSession(options) //работает, но с предупреждением экспериментального функионала
        await dbConnect()

        const formData: any = await request.formData()

        let company: Partial<CompanyInterface> = {}
        
        const logo = formData.get('logo') as Blob | null
        formData.delete('logo')
        if (logo) {
            const buffer = Buffer.from(await logo.arrayBuffer())
            const uploadedLogo = await s3.Upload({buffer: buffer}, '/companyLogo/')
            company.logo = new YCUploadDto(uploadedLogo)
        }
        
        for (const [key, value] of formData.entries()) {
            company[key as keyof CompanyInterface] = value
        }

        const newCompany: Partial<CompanyInterface> = {authorId: new Types.ObjectId(session.user.id), ...company}
        const result = await CompanySchema.create(newCompany)
        return NextResponse.json(result)
    } catch (error: any) {
        console.log(error)
        return NextResponse.json({error: error.message}, {
            status: 500
        })
    }
}

// export async function GET() {
//     try {
//         const session: any = await getServerSession(options) //работает, но с предупреждением экспериментального функионала
//         await dbConnect()

//         const result = await CompanySchema.findOne({authorId: new Types.ObjectId(session.user.id)})
//         return NextResponse.json(result)
//     } catch (error: any) {
//         return NextResponse.json({error: error.message}, {
//             status: 500
//         })
//     }
// }