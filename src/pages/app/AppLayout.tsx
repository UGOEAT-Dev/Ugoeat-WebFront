import './app.layout.scss'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'
import { useState } from 'react'
import BodyHidder from '../../features/common/components/elements/BodyHidder'
import ModalCart from './components/ModalCart'
import { HotkeysProvider } from 'react-hotkeys-hook'
import SearchDialog from '@/features/search/components/SearchDialog'
import useShowSearchDialog from '@/features/search/hooks/useShowSearchDialog'

function AppLayout(): React.ReactElement
{
    const [isVisible, setVisible] = useState(false)
    const {showSearchDialog} = useShowSearchDialog()

    return (
        <HotkeysProvider initiallyActiveScopes={['search']} >
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
            { showSearchDialog && <SearchDialog />}
        </HotkeysProvider>
    )
}

export default AppLayout