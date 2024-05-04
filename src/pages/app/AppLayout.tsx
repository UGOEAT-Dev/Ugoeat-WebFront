import './app.layout.scss'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { useState } from 'react'
import BodyHidder from '../../components/BodyHidder'
import ModalCart from './components/ModalCart'

function AppLayout(): React.ReactElement
{
    const [isVisible, setVisible] = useState(false)

    return (
        <>
            <Header onCartBtnClicked={() => setVisible(true) } />
            <main>
                <Outlet />
            </main>
            <Footer />
            
            { isVisible && 
                <BodyHidder>
                    <div className='bg-white h-screen sm:w-3/5 lg:w-2/5 p-3'>
                        <ModalCart
                            onCloseBtnClicked={() => setVisible(false)}  
                            className="rounded-xl bg-white z-0 h-full w-full shadow"/>
                    </div>
                </BodyHidder>
            }
        </>
    )
}

export default AppLayout