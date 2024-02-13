
import logoWhite from "../../../assets/images/logo-white.png"
import {useContext} from "react";
import AppContext from "../../../AppContext.jsx";

function DashboardHeader({logout, unRegister, ...props})
{
    const {user} = useContext(AppContext)

    return (
        <header className={"bg-white mb-1 shadow-md flex p-3 gap-3 justify-between " + props.className}>
            <h3 className="text-2xl flex gap-1 items-center font-bold">
                <img width={64} src={logoWhite}/>
                <span>UGOEAT</span>
            </h3>
            <div className=" flex gap-3 ">
                <div className="flex items-center gap-1">
                    <img alt="_" src={user.image_url} className="rounded-full border" width="50" />
                    <div>
                        <h3 className="font-bold">{user.name}</h3>
                        <span className="text-sm text-gray-500">{roleToName(user.role)}</span>
                    </div>
                </div>
            </div>
        </header>
    )
}

function roleToName(role)
{
    const r = role.toLowerCase()
    if(r === 'customer')
        return 'Client'
    else if (r === 'restaurant')
        return 'Restaurant'
    else if (r === 'admin')
        return 'Administrateur'
    else
        return 'Non Valide'
}
export default DashboardHeader