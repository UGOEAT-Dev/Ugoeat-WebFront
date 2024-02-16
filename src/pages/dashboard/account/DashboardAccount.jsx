import {useOutletContext} from "react-router-dom";
import {useState} from "react";
import UpdateImageProfile from "./UpdateImageProfile.jsx";
import UpdatePersonnalInformations from "./UpdatePersonnalInformations.jsx";

function DashboardAccount()
{
    const {user} = useOutletContext()
    const [errors, setErrors] = useState([])
    const [isProfileUpdated, setUpdated] = useState(false)
    const hasErrors = errors.length !== 0

    return (
        <div>
            <h1 className="text-2xl font-bold">Mon Compte</h1>
            {(isProfileUpdated) ? (
                <div> Success </div>
            ) : ( hasErrors ) ? (
                <div> Error </div>
            ) : (<></>)}
            <div className="space-y-5 sm:space-y-0 sm:flex gap-2 mt-2">
                <UpdateImageProfile setErrors={setErrors} errors={errors} user={user} setUpdated={setUpdated}/>
                <UpdatePersonnalInformations user={user} setUpdated={setUpdated} setErrors={setErrors} errors={errors} />
            </div>
        </div>
    )

}

export default DashboardAccount