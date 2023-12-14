'use client'

import { Provider } from 'react-redux'
import { store } from '@/redux/store'

export default function Layout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <Provider store={store}>
                {children}
            </Provider>

        </html>
    )
}
