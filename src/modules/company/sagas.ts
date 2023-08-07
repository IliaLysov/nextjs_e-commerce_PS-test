import { call, takeEvery, put } from 'redux-saga/effects'
import { companyRegistrationPost } from './sagaActions'

function* companyRegistrationPostSaga(action: any): Generator {
    try {

    } catch (e: any) {
        console.log(e)
    }
}

export function* companySaga() {
    yield takeEvery(companyRegistrationPost.type, companyRegistrationPostSaga)
}