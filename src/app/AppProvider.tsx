'use client'

import { SessionProvider } from "next-auth/react"
import { Provider } from "react-redux"
import { store } from "@/app/store"
import { ThemeProvider } from '@mui/material'
import theme from '@/app/muiTheme'


function AppProvider({children}: {
    children: React.ReactNode,
}) {
    
    return (
        <SessionProvider>
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    {children}
                </ThemeProvider>
            </Provider>
        </SessionProvider>
    )
}

export default AppProvider