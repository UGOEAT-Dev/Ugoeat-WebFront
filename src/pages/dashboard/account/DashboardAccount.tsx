import {useState} from "react";
import UpdateImageProfile from "./UpdateImageProfile";
import UpdatePersonnalInformations from "./UpdatePersonnalInformations";
import { useStoreContext } from "../../../features/store/store.context";
import { RegistrationError } from "../../../core/types/error/RegistrationError";

function DashboardAccount()
{
    const {user} = useStoreContext()
    const [errors, setErrors] = useState<RegistrationError>({})

    return (
        <div>
            <h1 className="text-2xl font-bold">Mon Compte</h1>
            <div className="flex flex-col md:flex-row space-y-5 md:space-y-0 gap-2 mt-2">
                <UpdateImageProfile setErrors={setErrors} user={user}/>
                <UpdatePersonnalInformations user={user} setErrors={setErrors} errors={errors} />
            </div>
        </div>
    )

}

export default DashboardAccount