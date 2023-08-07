import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setCompany } from './actions'
import { RootState } from '@/app/store'

const company = createReducer('some string', (builder) => {
    builder.addCase(setCompany, (state, {payload}) => payload)
})


export default combineReducers({
    company
})

const companySelector = (state: RootState) => state.rootReducer.company.company

export {companySelector}