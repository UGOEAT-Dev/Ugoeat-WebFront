import './app.layout.scss'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import Footer from './components/Footer'

function AppLayout(): React.ReactElement
{
    return (
        <>
            <Header onCartBtnClicked={null} />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default AppLayout