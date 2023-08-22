export interface FiltersInterface {
    price: PriceInterface
    count: number
    id?: IdInterface
}

export type PriceInterface = {min: number, max: number}
// export type CountInterface = {min: number, max: number}
export type IdInterface = string[]

export enum FiltersNameEnum {
    count = 'count',
    price = 'price',
    id = 'id'
}

export type FiltersNameType = FiltersNameEnum[keyof FiltersNameEnum]

export type FiltersType = FiltersInterface[keyof FiltersInterface]