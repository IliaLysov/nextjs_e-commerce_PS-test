export enum ModalTypeEnum {
    LogIn = 'LOGIN',
    Registration = 'REGISTRATION',
    Loading = 'LOADING',
    PlantForm = 'PLANT_FORM',
    Success = 'SUCCESS',
    Error = 'ERROR',
    CompanyRegistration = 'COMPANY_REGISTRATION',
    Filters = 'FILTERS',
}

export type ModalType = ModalTypeEnum[keyof ModalTypeEnum]


export interface ModalInterface {
    type: ModalType,
    data?: any
}



