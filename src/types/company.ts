import { Types } from "mongoose"

export interface CompanyInterface {
    name: string
    latinName: string
    description?: string
    email: string
    site?: string
    whatsApp?: string
    telegram?: string
    activationLink?: string
    approved: boolean
    logo: {
        location: string
        key: string
    } | null,
    authorId: Types.ObjectId
    editorsId?: Types.ObjectId[]
    _id?: string
}

export enum CompanyEnum {
    name='name',
    latinName='latinName',
    description='description',
    email='email',
    site='site',
    whatsApp='whatsApp',
    telegram='telegram'
}

export interface CompanyFormInterface {
    name: string
    latinName: string
    description: string
    email: string
    site: string
    whatsApp: string
    telegram: string
    logo: FileList | null,
}