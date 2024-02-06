import {Outlet} from "react-router-dom";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import './root.scss'

/**
 * Represent The base of the web Application
 */
export default function Root()
{

    return <>
        <Header/>
        <main><Outlet/></main>
        <Footer />
    </>
}
