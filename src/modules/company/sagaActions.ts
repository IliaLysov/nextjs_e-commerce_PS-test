import { CompanyFormInterface } from '@/types/company'
import {createAction} from '@reduxjs/toolkit'

export const companyRegistrationPost = createAction<CompanyFormInterface>('COMPANY_REGISTRATION_POST')