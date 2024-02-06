import {Outlet} from "react-router-dom";
import Header from "./components/Header.jsx";
import './root.scss'
import {useEffect} from "react";

/**
 * Represent The base of the web Application
 */
export default function Root()
{

    return <>
        <Header/>
        <main><Outlet/></main>
    </>
}
