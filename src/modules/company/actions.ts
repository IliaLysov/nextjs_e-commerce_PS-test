import { CompanyInterface } from '@/types/company'
import {createAction} from '@reduxjs/toolkit'


// export const setOwnCompany = createAction<CompanyInterface | null>('SET_COMPANY') //вохможно придется присваивать параметром в session
export const setCompanyFormError = createAction<string>('SET_COMPANY_FORM_ERROR')