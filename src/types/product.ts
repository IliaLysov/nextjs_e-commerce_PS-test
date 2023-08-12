import { Types } from "mongoose"


export enum PlantOwnerTypeEnum {
    Owner = 'OWNER',
    General = 'GENERAL'
}

export interface PlantFormInterface {

}

export interface PlantInterface {
    name: string;
    latinName: string;
    description?: string;
    price?: number;
    quantity?: number;
    onSale?: boolean;
    rootPacking?: string;
    packageType?: string;
    packageCount?: number;
    seedlingHight?: number;
    seedlingWidth?: number;
    seedTrunkHeight?: number;
    seedTrunkGirth?: number;
    plantType?: string[];
    leafType?: string;
    frostResistance?: number;
    lightLevel?: string;
    crownShape?: string[];
    floweringPeriod?: string[];
    careFeature?: string[];
    soil?: string[];
    deseaseResistance?: string;
    permanentLeafColor?: string[];
    autumnLeafColor?: string[];
    flowerColor?: string[];
    trunkColor?: string[];
    plantHeight?: string;
    plantWidth?: string;
    plantTrunkHeight?: string;
    plantTrunkGirth?: string;
    authorId: Types.ObjectId; // Assuming you have imported Types from mongoose
    companyId: Types.ObjectId;
    companyInfo: {
        latinName: string;
        logo: string;
    };
    images?: {
        location: string;
        key: string;
    }[];
}

export type ProductType = PlantInterface | null