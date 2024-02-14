import {useOutletContext} from "react-router-dom";
import ModalCart from "../../root/components/ModalCart.jsx";
import {useContext} from "react";
import AppContext from "../../../AppContext.jsx";
import {
    calculcateProfileCompletedPercentage,
    checkUserProfileComplete, hasAddress,
    hasImage,
    hasTel
} from "../../../lib/helpers.jsx";
import {AiOutlineClose} from "react-icons/ai";

function DashboardHome()
{
    const {user, token} = useOutletContext()
    const {orders, setOrders} = useContext(AppContext)
    const {state, count} = checkUserProfileComplete(user)
    const percent = calculcateProfileCompletedPercentage(state, count)

    const isProfileComplete = percent => percent >= 1

    return (
        <div>
            <h1 className="text-2xl font-bold">Tableau de bord</h1>
            <div className="flex flex-col gap-5">
                {isProfileComplete(percent) ? (<></>) : (
                    <div className="relative bg-red-400 p-3 rounded-xl text-white text-sm">
                        <span className="block font-bold sm:text-xl">Profil completer a {Math.round(percent * 100)}%</span>
                        <button
                            className="absolute right-2 top-2 hover:bg-gray-50 hover:text-black p-1 rounded-md"
                            onClick={(e) => {
                                const btn = e.target.parentNode
                                const div = btn.parentNode
                                div.classList.add('hidden')}
                            }>
                            <AiOutlineClose size={20}/>
                        </button>
                        <details className="text-black">
                            <summary>Veuillez completer votre profil</summary>
                            <div className="ml-5">
                                    {hasTel(user)       ? <></> : <li>Ajouter un Numero de Telephone</li>}
                                    {hasAddress(user)   ? <></> : <li>Ajouter une adresse de livraison</li>}
                                    {hasImage(user)     ? <></> : <li>Ajouter une photo de profil</li>}
                            </div>
                        </details>
                    </div>
                )}
                <ModalCart products={orders.products} className="rounded-xl bg-white z-0 w-full"/>
            </div>
        </div>
    )

}

export default DashboardHome