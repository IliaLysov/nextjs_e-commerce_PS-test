import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setModal, setPending } from './actions'
import { RootState } from '@/app/store'
import { ModalInterface } from '@/types/modal'

const modal = createReducer<ModalInterface | null>(null, (builder) => {
    builder.addCase(setModal, (state, {payload}) => payload)
})

const pending = createReducer<boolean>(true, (builder) => {
    builder.addCase(setPending, (state, {payload}) => payload)
})

export default combineReducers({
    modal,
    pending
})

const modalSelector = (state: RootState) => state.rootReducer.ui.modal
const pendingSelector = (state: RootState) => state.rootReducer.ui.pending

export {modalSelector, pendingSelector}