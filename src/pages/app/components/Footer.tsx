import NewsLetter from "./NewsLetter";
import logoImg from "/static.ugoeatonline.com/assets/images/logo-white.png"
import {NavLink} from "react-router-dom";


const TEL = "(+237) 695 889 924"
const EMAIL = "contact@ugoeatonline.com"
const LOCATION = "Kotto/Douala, Cameroun"

function Footer()
{
    return (
        <footer className="flex flex-col px-5 md:px-10 space-y-5 bg-black text-white pt-10">
            <NewsLetter className="border-2 border-white"/>
            <div className="flex flex-col md:flex-row justify-evenly my-5 space-y-5">
                <div className="text-center">
                    <img src={logoImg} className="m-auto" width="128px" alt="logo"/>
                    <p>Le meilleur service pour restaurant en ligne au Cameroun</p>
                    <div className="flex flex-col md:flex-row mt-2 justify-evenly font-bold">
                        <p className="hover:text-green-400"><NavLink to={'#'}>Mention Legale</NavLink></p>
                        <p className="hover:text-green-400"><NavLink to={'#'}>Conditions d&apos;utilisation</NavLink></p>
                    </div>
                </div>
                <div>
                    <h3 className="text-2xl text-center text-green font-bold">Contactez-nous</h3>
                    <div className="mt-2">
                        <ul className="w-fit mx-auto list-none space-y-2 ">
                            <li><a href="#" className="flex items-center space-x-2"><i className="pi pi-phone"></i> <span>{TEL}</span></a></li>
                            <li><a href="#" className="flex items-center space-x-2"><i className="pi pi-envelope"></i> <span>{EMAIL}</span></a></li>
                            <li><a href="#" className="flex items-center space-x-2"><i className="pi pi-map-marker"></i> <span>{LOCATION}</span></a></li>
                            <li className="flex items-center justify-center space-x-5">
                                <a href="#"><i className="pi pi-facebook rounded-full"></i></a>
                                <a href="#"><i className="pi pi-whatsapp rounded-full"></i></a>
                                <a href="#"><i className="pi pi-youtube rounded-full"></i></a>
                                <a href="#"><i className="pi pi-twitter rounded-full"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="text-center font-bold">
                <hr />
                <span>Copyright &copy; Tout droit reserve {new Date().getFullYear() }</span>
            </div>
        </footer>
    )
}

export default Footer