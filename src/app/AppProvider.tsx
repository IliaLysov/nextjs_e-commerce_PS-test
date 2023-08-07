'use client'

import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import { store } from "@/app/store"

function AppProvider({children}: {
    children: React.ReactNode,
}) {
    
    return (
        <SessionProvider>
            <Provider store={store}>
                {children}
            </Provider>
        </SessionProvider>
    )
}

export default AppProvider