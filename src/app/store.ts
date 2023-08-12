import { Store, configureStore } from "@reduxjs/toolkit"
import createSagaMiddleware, {Task} from 'redux-saga'
import rootReducer from '@/modules'
import { companySaga } from "@/modules"
import { productSaga } from "@/modules"
import { cartSaga } from "@/modules"
import { favoritesSaga } from "@/modules"
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'


const sagaMiddleware = createSagaMiddleware()
const middleware = [sagaMiddleware]

const isServer = typeof window === 'undefined'

export interface SagaStore extends Store {
    sagaTask?: Task
}


export const store = configureStore({
    reducer: {
        rootReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            immutableCheck: false
        }).concat(middleware),
    devTools: !isServer
})

sagaMiddleware.run(companySaga)
sagaMiddleware.run(productSaga)
sagaMiddleware.run(cartSaga)
sagaMiddleware.run(favoritesSaga)



export type AppStore = typeof store
export type AppState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
export type RootState = ReturnType<typeof store.getState>


export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector