import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setCompanyFormError } from './actions'
import { RootState } from '@/app/store'
import { CompanyInterface } from '@/types/company'

// const ownCompany = createReducer<CompanyInterface | null>(null, (builder) => {
//     builder.addCase(setOwnCompany, (state, {payload}) => payload)
// })

const companyFormError = createReducer<string>('', (builder) => {
    builder.addCase(setCompanyFormError, (state, {payload}) => payload)
})

export default combineReducers({
    // ownCompany,
    companyFormError
})

// const ownCompanySelector = (state: RootState) => state.rootReducer.company.ownCompany
const companyFormErrorSelector = (state: RootState) => state.rootReducer.company.companyFormError

export {
    // ownCompanySelector,
    companyFormErrorSelector
}