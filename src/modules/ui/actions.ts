import { ModalInterface } from "@/types/modal"
import {createAction} from '@reduxjs/toolkit'

export const setModal = createAction<ModalInterface | null>('SET_MODAL')