import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import './layout.scss'

const Layout = ({ children }) => {
    return (
        <div>
            <div style={{position:"sticky",top:0,zIndex:1}}>
                < Header />
            </div>

            <div className='layout'>
                <div className='layout-box'>
                    {children}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Layout