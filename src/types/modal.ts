export enum ModalTypeEnum {
    LogIn = 'LOGIN',
    Registration = 'REGISTRATION',
    Loading = 'LOADING',
    ItemForm = 'ITEM_FORM',
    Success = 'SUCCESS',
    Error = 'ERROR',
    OrganizationRegistration = 'ORGANIZATION_REGISTRATION'
}

export type ModalType = ModalTypeEnum[keyof ModalTypeEnum]


export interface ModalInterface {
    type: ModalType | null,
    data?: any
}



