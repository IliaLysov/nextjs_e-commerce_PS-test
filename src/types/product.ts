import { Types } from "mongoose"


export enum PlantOwnerTypeEnum {
    Owner = 'OWNER',
    General = 'GENERAL',
    Favorites = 'FAVORITES',
    Cart = 'CART'
}

export type PlantOwnerType = PlantOwnerTypeEnum[keyof PlantOwnerTypeEnum]

export enum PlantItemTypeEnum {
    Horizon = 'HORIZON',
    Tile = 'TILE'
}

export type PlantItemType = PlantItemTypeEnum[keyof PlantItemTypeEnum]

export interface PlantFormInterface {

}

export interface PlantInterface {
    _id: string;
    name: string;
    latinName: string;
    description?: string;
    price: number;
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