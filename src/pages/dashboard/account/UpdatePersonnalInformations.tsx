import InputWithLabel from "@/features/common/components/elements/input/InputWithLabel";
import {FormEventHandler, useState} from "react";
import useUpdateAccount from "@/features/account/hooks/useUpdateAccount";
import { User } from "@/features/common/types/User";
import { RegistrationError } from "@/features/common/types/error/RegistrationError";
import { Mutator } from "@/features/common/types/mutator/Mutator";

function UpdatePersonnalInformations({user, errors, setErrors}: {user: User, errors: RegistrationError, setErrors: Mutator<RegistrationError>})
{
    const { update } = useUpdateAccount()
    const [ name, setName ] = useState(user.name)
    const [ email ] = useState(user.email)
    const [ address, setAddress ] = useState(user.address ?? '')
    const [ tel, setTel ] = useState(user.tel ?? '')

    const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault()
        update(setErrors, {
            email,
            name,
            address,
            tel
        })
    }

    return (
        <div className="bg-white p-5 w-full rounded-lg">
            <form onSubmit={onSubmit}>
                <h3 className="font-bold text-lg">Informations Personnelles</h3>
                <p className="text-sm mb-3 text-gray-500">Mettez a jour vos informations personnelles a l'exception de votre adresse Email</p>
                <InputWithLabel className="mb-3" required disabled value={email} label="Email" id="email" name="email" placeholder="name@domain"/>
                <InputWithLabel error={errors.errors?.name} className="mb-3" value={name} label="Nom Complet" id="name" onChange={e => setName(e.target.value)} name="name" placeholder="Ex: John Doe"/>
                <InputWithLabel error={errors.errors?.address} className="mb-3" value={address} label="Adresse" id="address" onChange={e => setAddress(e.target.value)} name="address" placeholder="Ex: Kotto, Douala"/>
                <InputWithLabel error={errors.errors?.tel} className="mb-3" value={tel} label="Telephone" id="tel" onChange={e => setTel(e.target.value)} name="tel" placeholder="Ex: +237 6XX XXX XXX"/>
                <button className="bg-green text-white hover:text-black py-3 px-5 rounded-md" type="submit">Mettre a jour</button>
            </form>
        </div>
    )
}

export default UpdatePersonnalInformations