export interface FiltersInterface {
    price: PriceInterface
    count: CountInterface
}

export type PriceInterface = {min: number, max: number}
export type CountInterface = {min: number, max: number}

export enum FiltersNameEnum {
    price = 'price'
}

export type FiltersNameType = FiltersNameEnum[keyof FiltersNameEnum]

export type FiltersType = FiltersInterface[keyof FiltersInterface]