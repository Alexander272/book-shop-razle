import React from 'react'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

export const MainLayout = ({ children, active = null }) => {
    return (
        <div className={'wrapper'}>
            <Header active={active} />
            <div className={'container'}>{children}</div>
            <Footer />
        </div>
    )
}
