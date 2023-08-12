import { call, takeEvery, put } from 'redux-saga/effects'
import { companyRegistrationPost } from './sagaActions'
import CompanyService from '@/services/company'
import { CompanyInterface } from '@/types/company'
import { setCompanyFormError } from '.'
import { setModal } from '..'

function* companyRegistrationPostSaga(action: ReturnType<typeof companyRegistrationPost>): Generator {
    try {

        const companyForm: any = action.payload
        const data: any = new FormData()

        for (const property in companyForm) {
            const type = typeof companyForm[property]
            if (property === 'logo' && companyForm.logo) {
                for (let i = 0; i < companyForm.logo.length; i++) {
                    data.append('logo', companyForm.logo[i])
                }
            } else if (type === 'number' || type === 'string') {
                companyForm[property] && data.append(property, companyForm[property])
            }
        }

        const response: any = yield call(CompanyService.registration, data)
        if (response.error) {
            yield put(setCompanyFormError(response.error))
        } else {
            // yield put(setOwnCompany(response))
            yield call(() => {
                const event = new Event('visibilitychange')
                document.dispatchEvent(event)
            })
            yield put(setModal(null))
        }
    } catch (e: any) {
        console.log(e)
    }
}


// function* getOwnCompanySaga(): Generator {
//     try {
//         const company = yield call(CompanyService.getOwn)
//         yield put(setOwnCompany(company as CompanyInterface | null))

//     } catch (e: any) {
//         console.log(e)
//     }
// }

export function* companySaga() {
    yield takeEvery(companyRegistrationPost.type, companyRegistrationPostSaga)
    // yield takeEvery(getOwnCompany.type, getOwnCompanySaga)
}