import {createReducer, combineReducers} from '@reduxjs/toolkit'
import { setModal } from './actions'
import { RootState } from '@/app/store'
import { ModalInterface } from '@/types/modal'

const modal = createReducer<ModalInterface | null>(null, (builder) => {
    builder.addCase(setModal, (state, {payload}) => payload)
})

export default combineReducers({
    modal
})

const modalSelector = (state: RootState) => state.rootReducer.ui.modal

export {modalSelector}