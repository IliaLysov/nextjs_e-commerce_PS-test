import { Types } from "mongoose"

export interface CompanyInterface {
    name: string,
    latinName: string,
    description?: string,
    email: string,
    site?: string,
    whatsApp?: string,
    telegram?: string,
    activationLink?: string,
    approved: boolean,
    logo: {
        location: string,
        key: string
    },
    adminId: Types.ObjectId,
    editorsId: Types.ObjectId[]
}