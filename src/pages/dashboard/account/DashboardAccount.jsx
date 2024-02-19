import {useOutletContext} from "react-router-dom";
import {useState} from "react";
import UpdateImageProfile from "./UpdateImageProfile.jsx";
import UpdatePersonnalInformations from "./UpdatePersonnalInformations.jsx";

function DashboardAccount()
{
    const {user} = useOutletContext()
    const [errors, setErrors] = useState([])

    return (
        <div>
            <h1 className="text-2xl font-bold">Mon Compte</h1>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 gap-2 mt-2">
                <UpdateImageProfile setErrors={setErrors} errors={errors} user={user}/>
                <UpdatePersonnalInformations user={user} setErrors={setErrors} errors={errors} />
            </div>
        </div>
    )

}

export default DashboardAccount