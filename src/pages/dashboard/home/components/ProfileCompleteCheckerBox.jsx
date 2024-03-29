import {AiOutlineClose} from "react-icons/ai";
import {hasAddress, hasImage, hasTel} from "../../../../lib/helpers.jsx";
import {useContext} from "react";
import AppContext from "../../../../AppContext.jsx";

function ProfileCompleteCheckerBox({percent = 0, visible = false, onHide})
{
    const {user} = useContext(AppContext)

    return visible && (
        <div className="relative bg-red-400 p-3 rounded-xl text-white text-sm">
            <span className="block font-bold sm:text-xl">Profil completer a {Math.round(percent * 100)}%</span>
            <button
                className="absolute right-2 top-2 hover:bg-gray-50 hover:text-black p-1 rounded-md"
                onClick={onHide}>
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
    )
}

export default ProfileCompleteCheckerBox